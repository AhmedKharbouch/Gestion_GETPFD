import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Category} from "../../model/category.model";
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Fournisseur} from "../../model/fournisseur.model";
import {FournisseurService} from "../../services/fournisseur.service";
import {TypeFournisseur} from "../../model/typeFournisseur.model";

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  fournisseur! : Observable<Array<Fournisseur>>;
  errorMessage! :String;
  searchFormGroup! :UntypedFormGroup;
  formulaireNouveauFSR!: FormGroup;
  categories!: Observable<TypeFournisseur[]>;
  constructor(private fournisseurService:FournisseurService,
              private fb:UntypedFormBuilder,
              private router:Router,
              private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });

    this.handleSearchFournisseurs()
    this.categories = this.fournisseurService.getTypeFournisseurs();
    this.formulaireNouveauFSR = this.formBuilder.group({
      label: ['', [Validators.required, Validators.minLength(4)]],
      prix_HT: ['', [Validators.required]],
      quantite: ['', [Validators.required, Validators.minLength(1)]],
      categoryId: [''],
      nom: ['', [Validators.required, Validators.minLength(4)]],
      telephone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      telephoneFixe: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', [Validators.required, Validators.minLength(4)]],
      ville: ['', [Validators.required, Validators.minLength(2)]],
      typeFsrId: [''],
    });
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
      this.fournisseur = this.fournisseurService.searchFsrs(kw).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }
  }
  handleSaveFournisseur() {
    const nouveauProduit: Fournisseur = this.formulaireNouveauFSR.value;
    console.log(nouveauProduit.typeFsrId);
    this.fournisseurService.getTypeFsrById(nouveauProduit.typeFsrId).subscribe({
      next: (categorie) => {
        nouveauProduit.typeFournisseur = categorie;
        console.log(nouveauProduit.typeFournisseur.nom);
        this.fournisseurService.saveFournisseur(nouveauProduit).subscribe({
          next: (data) => {
            alert(data.nom + " saved successfully");
           // this.router.navigateByUrl("/fournisseurs").then(() => console.log('Navigated to products page'));
           this.reloadPage();
          },
          error: (error) => {
            alert(nouveauProduit.nom + " already exists");
            console.log(error);
            this.formulaireNouveauFSR.reset();
          },
        });
      },
    });
  }
  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });}
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
