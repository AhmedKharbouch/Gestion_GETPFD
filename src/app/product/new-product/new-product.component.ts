import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Customer} from "../../model/customer.model";
import {Product} from "../../model/product.model";
import {ProductService} from "../../services/product.service";
import {Observable, Subscription} from "rxjs";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../model/category.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  newProductForGroup! :UntypedFormGroup
  categories!:Observable<Array<Category>>
  categoryId!:Category;

  errorMessage! :String;
  constructor(private fb :UntypedFormBuilder,private categoryService:CategoryService,private productService:ProductService,private router :Router) { }

  ngOnInit(): void {
    this.categories=this.categoryService.getCategories();
    this.newProductForGroup=this.fb.group({
      label:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      prix_HT:this.fb.control(null,[Validators.required]),
      quantite:this.fb.control(null,[Validators.required,Validators.minLength(1)]),
      categoryId:this.fb.control(null)
    });
  }


  handleSaveProduct() {

    let product:Product = this.newProductForGroup.value;
    this.categoryService.getCategoryById(product.categoryId).subscribe({
      next:data=>{
        product.category=data;
        console.log(product.category.id);
        console.log(product.category.nom);
        console.log(product.category.createdAt);
        console.log(product.category.modifiedAt);
        console.log(product.categoryId);
        this.productService.saveProduct(product).subscribe({
          next:data=>{
            alert(data.label+ " saved successfully");
            //this.newCustomerForGroup.reset()
            this.router.navigateByUrl("/products").then(r => console.log(r)); // navigate to products page  after saving  the product
          },error: err => {

            alert( product.label +" already exist");
            console.log( err.value);
            this.newProductForGroup.reset()
          }
        });
      }
    });



  }

}
