import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Category} from "../../model/category.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Fournisseur} from "../../model/fournisseur.model";
import {FournisseurService} from "../../services/fournisseur.service";

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  fournisseur! : Observable<Array<Fournisseur>>;
  errorMessage! :String;
  searchFormGroup! :UntypedFormGroup;
  constructor(private fournisseurService:FournisseurService,private fb:UntypedFormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });

    this.handleSearchFournisseurs()
  }
  handleSearchFournisseurs() {
    this.fournisseur=this.fournisseurService.getFournisseurs().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  handleDeleteFournisseur(f: Fournisseur) {
    let conf =confirm("Are you sure?");
    if(!conf) return;
    this.fournisseurService.deleteFournisseur(f.id).subscribe({
      next:(resp)=>{
        this.fournisseur=this.fournisseur.pipe(
          map(data=>{
            let index=data.indexOf(f);
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

  handleUpdateFournisseur(fsr: Fournisseur) {
    this.router.navigateByUrl("/update-fournisseur/"+fsr.id,{state:fsr})
  }

  //search category by typing in the input
  handleSearchFournisseur() {

    let kw=this.searchFormGroup?.value.keyword.trim();

    if (kw == "") {
      this.handleSearchFournisseurs();
    }else
    {
      this.fournisseur = this.fournisseurService.searchFournisseurs(kw).pipe(
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
      this.handleSearchFournisseurs();
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

      this.fournisseur = this.fournisseurService.searchFournisseurs($event.code).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }

  }

}
