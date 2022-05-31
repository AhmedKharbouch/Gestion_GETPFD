import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId1! :number;
  //customer!:Customer;
  accounts! : Observable<Array<AccountDetails>>;
  accountFormGroup! : FormGroup
  errorMessage!:string;
  accountObservable! :Observable<AccountDetails>
  customerId:number=this.accountFormGroup?.value.customerId;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private http:HttpClient,private accountService :AccountsService) {
   // this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {

  /*  this.accountFormGroup=this.fb.group({
      customerId:this.fb.control("")
    });*/
    this.customerId1=this.route.snapshot.params['id'];
    this.handleAccountCustomers();
  }

  handleAccountCustomers() {

    this.accounts=this.accountService.getAccountCustomer(this.customerId1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }))
  }
  handleAccounts(accountDetails: AccountDetails) {
    this.router.navigateByUrl("/accounts",{state:accountDetails})
  }
}
