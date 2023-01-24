import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../../model/customer.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../services/category.service";
import {SecurityService} from "../../services/security.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products! : Observable<Array<Product>>;
  errorMessage! :String;
  searchFormGroup! :UntypedFormGroup;
  categories!:Observable<Array<Category>>;
  all:string="all";
  constructor(private securityService:SecurityService, private categoryService:CategoryService, private productService:ProductService,private fb:UntypedFormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.categories=this.categoryService.getCategories();
   this.handleSearchProducts()
  }
  handleSearchProducts() {
    let kw=this.searchFormGroup?.value.keyword;
    this.products=this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  hasRoleUser():boolean{
    return this.securityService.hasRole("USER");
  }

  hasRoleAdmin():boolean{
    return this.securityService.hasRole("ADMIN");
  }

  handleDeleteProduct(c: Product) {
    let conf =confirm("Are you sure?");
    if(!conf) return;
    this.productService.deleteProduct(c.id).subscribe({
      next:(resp)=>{
        this.products=this.products.pipe(
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

  handleUpdateProduct(product: Product) {
    this.router.navigateByUrl("/update-product/"+product.id,{state:product})
  }

  filterProductByCategory(event: any) {
    let categoryName=event.target.value;
    console.log(categoryName)
    if(categoryName==this.all){
    this.products=this.productService.getProducts();
    }else{
    this.products=this.productService.getProductsByCategoryNom(categoryName).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      } )
    );
  }
  }

}
