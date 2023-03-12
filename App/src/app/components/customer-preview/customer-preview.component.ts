import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-preview',
  templateUrl: './customer-preview.component.html',
  styleUrls: ['./customer-preview.component.scss'],
})
export class CustomerPreviewComponent implements OnInit {
  customer$: Observable<Customer | undefined> | undefined;

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit(): void {
    this.customer$ = this.customerService.getObservable();
  }
}
