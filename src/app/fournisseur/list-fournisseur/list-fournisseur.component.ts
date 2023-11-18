import {Component, OnInit} from '@angular/core';
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

  fsr!: Observable<Array<Fournisseur>>;
  errorMessage!: String;
  searchFormGroup!: UntypedFormGroup;
  formNouveauFSR!: FormGroup;
  cats!: Observable<TypeFournisseur[]>;
  nomFSR: string = "";

  constructor(private fsrService: FournisseurService,
              private fb: UntypedFormBuilder,
              private router: Router,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchFsr()
    this.cats = this.fsrService.getTypeFournisseurs();
    this.formNouveauFSR = this.formBuilder.group({
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

  handleSearchFsr() {
    this.fsr = this.fsrService.getFournisseurs().pipe(
      catchError(err => {
        this.errorMessage = err.error.errorMessage;
        throw err;
      })
    );
  }

  handleDeleteFsr(f: Fournisseur) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.fsrService.deleteFournisseur(f.id).subscribe({
      next: (resp) => {
        this.fsr = this.fsr.pipe(
          map(data => {
            let index = data.indexOf(f);
            data.slice(index, 1)
            return data;
          })
        )
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleUpdateFsr(fsr: Fournisseur) {
    this.router.navigateByUrl("/update-fournisseur/" + fsr.id, {state: fsr}).then(r => true)
  }

  handleSearchFournisseur() {

    let kw = this.searchFormGroup?.value.keyword.trim();

    if (kw == "") {
      this.handleSearchFsr();
    } else {
      this.fsr = this.fsrService.searchFsrs(kw).pipe(
        catchError(err => {
          this.errorMessage = err.error.errorMessage;
          throw err;
        })
      );
    }
  }

  handleSaveFsr() {
    const nvPdt: Fournisseur = this.formNouveauFSR.value;
    console.log(nvPdt.typeFsrId);
    this.fsrService.getTypeFsrById(nvPdt.typeFsrId).subscribe({
      next: (cat) => {
        nvPdt.typeFournisseur = cat;
        this.fsrService.saveFournisseur(nvPdt).subscribe({
          next: (data) => {
            this.nomFSR = data.nom;
            this.reloadPage();

          },
          error: (error) => {
            this.errorMessage = error.error.errorMessage;

            this.formNouveauFSR.reset();

          },
        });
      },
    });
  }
  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl(currentUrl).then(r => true);
    });
  }


}
