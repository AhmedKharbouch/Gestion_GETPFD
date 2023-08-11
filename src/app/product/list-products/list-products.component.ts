import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../../model/customer.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
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
  categories1!:Observable<Array<Category>>;
  all:string="all";
  formulaireNouveauProduit!: UntypedFormGroup;
  categories!: Observable<Category[]>;
  // Définir ces variables dans la classe du composant
  currentPage: number = 1;
  itemsPerPage: number = 10; // Nombre d'articles par page
  totalPages: number = 1;
  pages: number[] = [];
  constructor(private constructeurFormulaire: UntypedFormBuilder,private securityService:SecurityService, private categoryService:CategoryService, private productService:ProductService,private fb:UntypedFormBuilder,private router:Router,) { }

  ngOnInit(): void {
    this.categories1=this.categoryService.getCategories();
   this.handleSearchProducts()
    this.categories = this.categoryService.getCategories();
    this.formulaireNouveauProduit = this.constructeurFormulaire.group({
      label: ['', [Validators.required, Validators.minLength(4)]],
      prix_HT: ['', [Validators.required]],
      quantite: ['', [Validators.required, Validators.minLength(1)]],
      categoryId: [''],
    });
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
  enregistrerProduit(): void {
    const nouveauProduit: Product = this.formulaireNouveauProduit.value;
    this.categoryService.getCategoryById(nouveauProduit.categoryId).subscribe({
      next: (categorie) => {
        nouveauProduit.category = categorie;
        this.productService.saveProduct(nouveauProduit).subscribe({
          next: (data) => {
            alert(data.label + " enregistré avec succès");
           // this.router.navigateByUrl("/produits").then(() => console.log('Navigué vers la page des produits'));
            this.reloadPage();
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
  handleUpdateProduct(product: Product) {
    this.router.navigateByUrl("/update-product/"+product.id,{state:product})
  }
  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });}


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
