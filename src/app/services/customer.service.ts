import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // @TODO 9
  constructor(private http : HttpClient) { }
  // Les méthodes post, get, put, retournent des observables
  // @TODO 10, modification de any vers Array of customers
  public getCustomers() : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>('http://localhost:8085/customers');
  }
}
