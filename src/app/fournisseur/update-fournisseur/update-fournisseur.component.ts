import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category.model";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../../model/account.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Fournisseur} from "../../model/fournisseur.model";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FournisseurService} from "../../services/fournisseur.service";
import {Product} from "../../model/product.model";
import {ProductService} from "../../services/product.service";
import {TypeFournisseur} from "../../model/typeFournisseur.model";

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = this.handleSearchFsr(Number(this.router.routerState.snapshot.url.split("/")[2])) as unknown as Fournisseur;
  product1!: Product;
  typeFsr!: Observable<Array<TypeFournisseur>>;
  categoryId!: Category;
  FSRId!: number;
  errorMessage!: string;
  FsrFormGroup!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private fournisseurService: FournisseurService, private router: Router) {
    this.FSRId = Number(this.router.routerState.snapshot.url.split("/")[2]);
    this.handleSearchFsr(this.FSRId);
  }

  ngOnInit(): void {
    this.handleSearchtypeFsr();

    this.fournisseurService.getFournisseur(this.FSRId).subscribe(
      data => {
        this.fournisseur = data;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }



  handleSearchFsr(depotId: number) {
    this.fournisseurService.getFournisseur(depotId).subscribe(
      data => {
        this.fournisseur = data;
        console.log(data);
      }
    );
  }

  handleSearchtypeFsr() {
    this.typeFsr = this.fournisseurService.getTypeFournisseurs().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleUpdateFsr() {
    console.log(this.fournisseur.id);
    console.log(this.fournisseur.nom);
    console.log(this.fournisseur.createdAt);
    console.log(this.fournisseur.modifiedAt);
    console.log(this.fournisseur.ville);
    console.log(this.fournisseur.adresse);

    this.fournisseurService.updateFournisseur(this.fournisseur).subscribe({
      next: data => {
        alert(this.fournisseur.nom + " mis à jour avec succès");
        this.router.navigateByUrl("/fournisseurs");
      },
      error: err => {
        alert(this.fournisseur.nom + " n'existe pas");
        console.log(err.value);
        this.router.navigateByUrl("/fournisseurs");
      }
    });
  }
  handleBack() {
    this.router.navigateByUrl("/fournisseurs");
  }
}

