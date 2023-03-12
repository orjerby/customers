import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { idValidator, isNumber } from '../../utils/validators';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
})
export class CustomerSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private idSubscription: Subscription | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerService: CustomerService
  ) {
    this.searchForm = this.fb.group({
      id: ['', [Validators.required]],
    });
  }

  get idControl() {
    return this.searchForm.get('id');
  }

  ngOnInit(): void {
    this.idSubscription = this.idControl?.valueChanges.subscribe((value) => {
      if (value.length === 0 || isNumber(value[value.length - 1])) {
        if (this.idControl?.hasValidator(idValidator)) {
          this.idControl?.removeValidators(idValidator);
        }

        return;
      }

      this.idControl?.setValue(value.slice(0, -1), { emitEvent: false });
    });
  }

  onSubmit() {
    this.idControl?.addValidators(idValidator);
    this.idControl?.updateValueAndValidity();

    if (!this.searchForm.valid) {
      return;
    }

    this.customerService.search(this.idControl?.value).subscribe({
      next: (customer) => {
        this.customerService.set(customer);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._setFormError('notFound', 'הלקוח לא קיים');

          return;
        }

        this._setFormError('internalError', 'החיבור עם השרת כשל');
      },
    });
  }

  private _setFormError(type: string, message: string) {
    this.searchForm?.setErrors({
      [type]: message,
    });
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }
}
