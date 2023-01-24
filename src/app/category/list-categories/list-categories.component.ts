import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "../../model/product.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../model/category.model";
import {SecurityService} from "../../services/security.service";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categories! : Observable<Array<Category>>;
  errorMessage! :String;
  searchFormGroup! :UntypedFormGroup;
  constructor( private securityService:SecurityService , private categoryService:CategoryService,private fb:UntypedFormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });

    this.handleSearchCategories()
  }
  handleSearchCategories() {
    this.categories=this.categoryService.getCategories().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  handleDeleteCategory(c: Category) {
    let conf =confirm("Are you sure?");
    if(!conf) return;
    this.categoryService.deleteCategory(c.id).subscribe({
      next:(resp)=>{
        this.categories=this.categories.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        )
      },
      error:err => {
        console.log(err);
      }
    })
  }

  hasRoleUser():boolean{
    return this.securityService.hasRole("USER");
  }

  hasRoleAdmin():boolean{
    return this.securityService.hasRole("ADMIN");
  }

  handleUpdateCategory(category: Category) {
    this.router.navigateByUrl("/update-category/"+category.id,{state:category})
  }

  //search category by typing in the input
  handleSearchCategory() {

    let kw=this.searchFormGroup?.value.keyword.trim();

    if (kw == "") {
      this.handleSearchCategories();
    }else
    {
      this.categories = this.categoryService.searchCategories(kw).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }
  }

  handleSearchtest($event: KeyboardEvent) {
    //console.log($event);
    console.log($event.target);
    if ($event.key.length == 0) {
      this.handleSearchCategories();
    }else
    {
    /*  this.categoryService.searchCategories($event.key).subscribe({
        next:(resp)=>{
          this.categories=this.categories.pipe(
            map(data=>{
              let index=data.findIndex(c=>c.nom==$event.key);
              data.slice(index,1)
              return data;
            })
          )
        },
        error:err => {
          console.log(err);
        }
      })*/

      this.categories = this.categoryService.searchCategories($event.code).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }

  }
}
