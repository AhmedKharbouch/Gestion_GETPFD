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
  formulaireNouveauProduit!: UntypedFormGroup;
  categories!: Observable<Category[]>;

  constructor(
    private constructeurFormulaire: UntypedFormBuilder,
    private serviceCategorie: CategoryService,
    private serviceProduit: ProductService,
    private routeur: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.serviceCategorie.getCategories();
    this.formulaireNouveauProduit = this.constructeurFormulaire.group({
      label: ['', [Validators.required, Validators.minLength(4)]],
      prix_HT: ['', [Validators.required]],
      quantite: ['', [Validators.required, Validators.minLength(1)]],
      categoryId: [''],
    });
  }

  enregistrerProduit(): void {
    const nouveauProduit: Product = this.formulaireNouveauProduit.value;
    this.serviceCategorie.getCategoryById(nouveauProduit.categoryId).subscribe({
      next: (categorie) => {
        nouveauProduit.category = categorie;
        this.serviceProduit.saveProduct(nouveauProduit).subscribe({
          next: (data) => {
            alert(data.label + " enregistré avec succès");
            this.routeur.navigateByUrl("/produits").then(() => console.log('Navigué vers la page des produits'));
          },
          error: (erreur) => {
            alert(nouveauProduit.label + " existe déjà");
            console.log(erreur);
            this.formulaireNouveauProduit.reset();
          },
        });
      },
    });
  }
}
