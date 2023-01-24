import { Component, OnInit } from '@angular/core';
import {AccountDetails} from "../../model/account.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {AccountsService} from "../../services/accounts.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../services/category.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category:Category=this.router.getCurrentNavigation()?.extras.state as Category;
  category1!:Category
  categoryForm?:Category
  accountObservable! :Observable<AccountDetails>
  categoryFormGroup!:UntypedFormGroup
  errorMessage!: string;
  constructor(private fb:UntypedFormBuilder,private categoryService:CategoryService,private  router:Router) { }

  ngOnInit(): void {

    this.categoryFormGroup=this.fb.group({
      nom:this.fb.control(this.category.nom),

    })
    // this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  handleUpdateCategory() {
    this.category1 = this.categoryFormGroup.value;
    this.category.nom=this.category1.nom
    console.log(this.category.id)
    console.log(this.category.nom)
    console.log(this.category.createdAt)
    console.log(this.category.modifiedAt)
   /* this.categoryService.updateCategory(category1).pipe(

      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }))*/
    this.categoryService.updateCategory(this.category).subscribe({
      next:data=>{
        alert(this.category.nom + " updated successfully");
        //this.newCustomerForGroup.reset()
        this.router.navigateByUrl("/categories");
      },error: err => {

        alert( this.category.nom +" doesn't exist");

        console.log( err.value);
        this.router.navigateByUrl("/categories");
      }
    });
  }

  handleBack() {
    this.router.navigateByUrl("/categories");
  }
}
