import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, observeOn, throwError, map, debounceTime} from "rxjs";
import {Customer} from "../model/customer.model";
import {scheduler} from "node:timers/promises";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    JsonPipe,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers! : Observable<Array<Customer>>;
  // On dit au compilateur angular tkt pas je gère
  errorMessage! : string;
  // @TODO 14
  searchFormGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService, private fb : FormBuilder) {
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
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchCustomers();

    // Initial fetch of customers
    this.customers = this.customerService.getCustomers().pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    );
  }

  // Fonction de recherche
  handleSearchCustomers() {
    let keywordOfSearch = this.searchFormGroup?.value.keyword;
  }
}
