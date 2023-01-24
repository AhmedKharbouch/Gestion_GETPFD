import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../model/category.model";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  newCategoryForGroup! :UntypedFormGroup
  errorMessage! :String;
  constructor(private fb :UntypedFormBuilder,private categoryService:CategoryService,private router :Router) { }

  ngOnInit(): void {
    this.newCategoryForGroup=this.fb.group({
      nom:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
    });
  }

  handleSaveCategory() {
    let category:Category = this.newCategoryForGroup.value;
    this.categoryService.saveCategory(category).subscribe({
      next:data=>{
        alert(data.nom+ " saved successfully");
        //this.newCustomerForGroup.reset()
        this.router.navigateByUrl("/categories");
      },error: err => {

        alert( category.nom +" already exist");
        console.log( err.value);
        this.newCategoryForGroup.reset()
      }
    });

  }
}
