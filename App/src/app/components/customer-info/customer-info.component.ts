import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContractDialogComponent } from '../contract-dialog/contract-dialog.component';
import { Contract, Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressUpdate } from 'src/app/models/address-update.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CityStreetsService } from 'src/app/services/city-streets.service';
import { CityStreets } from 'src/app/models/city-streets.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  @Input() customer: Customer | undefined;

  addressUpdateForm: FormGroup;
  cityStreets: CityStreets[] | undefined;
  cityFilteredOptions: Observable<string[]> | undefined;
  streetFilteredOptions: Observable<string[] | undefined> | undefined;
  editMode: boolean = false;
  autoCompleteCurrentCity: CityStreets | undefined;
  dialogRef: MatDialogRef<ContractDialogComponent> | undefined;

  private subscriptions: Subscription[] | undefined;

  constructor(
    private readonly customerService: CustomerService,
    private readonly cityStreetsService: CityStreetsService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {
    this.addressUpdateForm = this.fb.group({
      city: '',
      street: '',
      houseNumber: '',
      postalCode: '',
    });
  }

  ngOnInit(): void {
    this.addressUpdateForm.disable();

    if (this.customer) {
      this._setInitialAddress(
        this.customer.city,
        this.customer.street,
        this.customer.houseNumber,
        this.customer.postalCode
      );

      this._onCustomerReady();
    }

    this.subscriptions?.push(
      this.customerService
        .getObservable()
        .subscribe((customer: Customer | undefined) => {
          this.customer = customer;

          if (!customer) {
            if (!this.dialogRef) {
              return;
            }

            this.dialogRef.close();

            return;
          }

          this._setInitialAddress(
            customer.city,
            customer.street,
            customer.houseNumber,
            customer.postalCode
          );

          this._onCustomerReady();
        })
    );
  }

  private _setInitialAddress(
    city: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    postalCode: string | undefined
  ) {
    this.addressUpdateForm.controls['city'].setValue(city);
    this.addressUpdateForm.controls['street'].setValue(street);
    this.addressUpdateForm.controls['houseNumber'].setValue(houseNumber);
    this.addressUpdateForm.controls['postalCode'].setValue(postalCode);
  }

  onSubmit() {
    if (!this.customer) {
      return;
    }

    const address = this.addressUpdateForm.value as AddressUpdate;
    this.customerService.updateAddress(this.customer.id, address).subscribe({
      next: (customer: Customer) => {
        this.customerService.set(customer);
      },
      error: (error: HttpErrorResponse) => {
        this._setFormError('internalError', 'החיבור עם השרת כשל');
      },
      complete: () => {
        this.editMode = false;
        this.addressUpdateForm.disable();
      },
    });
  }

  private _onCustomerReady() {
    this.cityStreetsService.get().subscribe((cityStreets: CityStreets[]) => {
      this.cityStreets = cityStreets;

      this.autoCompleteCurrentCity = cityStreets.find(
        (city) => city.name.trim() === this.customer?.city?.trim()
      );

      this.cityFilteredOptions = this.addressUpdateForm.controls[
        'city'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCities(value || ''))
      );

      this.streetFilteredOptions = this.addressUpdateForm.controls[
        'street'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filterStreets(value || ''))
      );

      this.addressUpdateForm.controls['city'].valueChanges.subscribe(
        (value) => {
          this.autoCompleteCurrentCity = cityStreets.find(
            (city) => city.name.trim() === value.trim()
          );

          if (this.autoCompleteCurrentCity?.name.trim() === value.trim()) {
            return;
          }

          this.addressUpdateForm.controls['street'].setValue('');
        }
      );
    });
  }

  private _filterCities(value: string): string[] {
    const filterValue = value;

    if (!this.cityStreets) {
      return [];
    }

    return this.cityStreets
      .filter((city) => city.name.includes(filterValue))
      .map((city) => city.name);
  }

  private _filterStreets(value: string): string[] | undefined {
    const filterValue = value;

    return this.autoCompleteCurrentCity?.streets.filter((street) =>
      street.includes(filterValue)
    );
  }

  enableAddressForm() {
    this.editMode = true;
    this.addressUpdateForm.enable();
  }

  private _setFormError(type: string, message: string) {
    this.addressUpdateForm?.setErrors({
      [type]: message,
    });
  }

  openInfo(contract: Contract) {
    this.dialogRef = this.dialog.open(ContractDialogComponent, {
      data: { ...contract },
      minWidth: 350,
      minHeight: 700,
    });
  }

  ngOnDestroy() {
    this.subscriptions?.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
