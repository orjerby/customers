import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { AddressUpdate } from '../models/address-update.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrl = 'https://localhost:7248/api/Customers';
  private customer: Customer | undefined;
  private readonly customerSubject = new Subject<Customer | undefined>();

  constructor(private readonly http: HttpClient, private router: Router) {}

  search(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  updateAddress(id: string, address: AddressUpdate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, address);
  }

  set(customer: Customer): void {
    setTimeout(() => {
      this.customer = undefined;
      this.customerSubject.next(this.customer);
      this.router.navigate(['/']);
    }, 300000); // 5 minutes

    this.customer = customer;
    this.customerSubject.next(customer);
  }

  get(id: string): Customer | undefined {
    if (this.customer?.id !== id) {
      return;
    }

    return { ...this.customer };
  }

  getObservable(): Observable<Customer | undefined> {
    return this.customerSubject.asObservable();
  }
}
