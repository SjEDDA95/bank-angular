import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, observeOn, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {scheduler} from "node:timers/promises";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers! : Observable<Array<Customer>>;
  // On dit au compilateur angular tkt pas je gère
  errorMessage! : string;

  constructor(private customerService : CustomerService) {
  }


  // @TODO 9 ,
  /**
   * GOOD CHATGPT EXPLANATION TO REMEMBER
   * ####################################
   * You can think of it like subscribing to a magazine:
   * you tell the publisher, "Whenever you release a new issue, send it to me."
   * Similarly, when you subscribe to an HTTP request's Observable,
   * you're telling Angular/RxJS, "Whenever this request returns data, give it to me by calling my next function. If there's an error,
   * call my error function. And when there are no more values coming, call my complete function."
   */
  ngOnInit(): void {
    // TODO #11: Begin Observable error handling
    this.customers = this.customerService.getCustomers().pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    );
    // TODO #11: End Observable error handling
  }
}
