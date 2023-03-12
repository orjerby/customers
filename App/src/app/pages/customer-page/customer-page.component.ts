import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss'],
})
export class CustomerPageComponent implements OnInit {
  customer: Customer | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.customer = this.customerService.get(id);

      if (this.customer) {
        return;
      }

      this.customerService.search(id).subscribe({
        next: (customer) => {
          this.customerService.set(customer);
          this.customer = customer;
        },
        error: (error: HttpErrorResponse) => {
          this.router.navigate(['/not-found']);
        },
      });
    });
  }
}
