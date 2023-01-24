import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {Product} from "../../model/product.model";
import {FournisseurService} from "../../services/fournisseur.service";
import {Fournisseur} from "../../model/fournisseur.model";
import {TypeFournisseur} from "../../model/typeFournisseur.model";

@Component({
  selector: 'app-new-fournisseur',
  templateUrl: './new-fournisseur.component.html',
  styleUrls: ['./new-fournisseur.component.css']
})
export class NewFournisseurComponent implements OnInit {

  newFsrForGroup! :UntypedFormGroup
  typeFournisseur!:Observable<Array<TypeFournisseur>>
  categoryId!:Category;

  errorMessage! :String;
  constructor(private fb :UntypedFormBuilder,private fournisseurService:FournisseurService,private productService:ProductService,private router :Router) { }

  ngOnInit(): void {
    this.typeFournisseur=this.fournisseurService.getTypeFournisseurs();
    this.newFsrForGroup=this.fb.group({
      nom:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      telephone:this.fb.control(null,[Validators.required,Validators.pattern("[0-9]{10}")]),
      telephoneFixe:this.fb.control(null,[Validators.required,Validators.pattern("[0-9]{10}")]),
      email:this.fb.control(null,[Validators.required,Validators.email]),
      adresse:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      ville:this.fb.control(null,[Validators.required,Validators.minLength(2)]),
      typeFsrId:this.fb.control(null)
    });
  }


  handleSaveFournisseur() {

    let fournisseur:Fournisseur = this.newFsrForGroup.value;
    this.fournisseurService.getTypeFsrById(fournisseur.typeFsrId).subscribe({
      next:data=>{
        fournisseur.typeFournisseur=data;
        console.log(fournisseur.nom);
        console.log(fournisseur.email);
        console.log(fournisseur.typeFournisseur.nom);
        console.log(fournisseur.adresse);
        console.log(fournisseur.ville);
        this.fournisseurService.saveFournisseur(fournisseur).subscribe({
          next:data=>{
            alert(data.nom+ " saved successfully");
            //this.newCustomerForGroup.reset()
            this.router.navigateByUrl("/fournisseurs").then(r => console.log(r)); // navigate to products page  after saving  the product
          },error: err => {

            alert( fournisseur.nom +" already exist");
            console.log( err.value);
            this.newFsrForGroup.reset()
          }
        });
      }
    });
      }





}
