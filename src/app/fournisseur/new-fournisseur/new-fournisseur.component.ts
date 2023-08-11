import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypeFournisseur } from '../../model/typeFournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { Router } from '@angular/router';
import { Fournisseur } from '../../model/fournisseur.model';

@Component({
  selector: 'app-new-fournisseur',
  templateUrl: './new-fournisseur.component.html',
  styleUrls: ['./new-fournisseur.component.css']
})
export class NewFournisseurComponent implements OnInit {
  formulaireNouveauFSR!: FormGroup;
  categories!: Observable<TypeFournisseur[]>;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
            this.router.navigateByUrl("/fournisseurs").then(() => console.log('Navigated to products page'));
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
}
