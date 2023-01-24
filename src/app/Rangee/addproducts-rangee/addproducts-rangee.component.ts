import { Component } from '@angular/core';
import {Depot} from "../../model/depot.model";
import {Product} from "../../model/product.model";
import {catchError, Observable, throwError} from "rxjs";
import {Rangee} from "../../model/rangee.model";
import {Category} from "../../model/category.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {GestionDepotService} from "../../services/gestion-depot.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addproducts-rangee',
  templateUrl: './addproducts-rangee.component.html',
  styleUrls: ['./addproducts-rangee.component.css']
})
export class AddproductsRangeeComponent {
  rangee!: Rangee;
  depotId= Number(this.router.routerState.snapshot.url.split("/")[2]);
  rangeeId =Number(this.router.routerState.snapshot.url.split("/")[3]);
  product1!:Product;
  products!:Observable<Array<Product>>;
  categoryId!:Category;
  newProductForGroup! :UntypedFormGroup
  productID!:number;
  errorMessage!: string;
  depot!: Depot;
  constructor(private fb:UntypedFormBuilder,private gestionDepotService:GestionDepotService,private  router:Router) {
  }

  ngOnInit(): void {
    this.handleSearchProducts();
    this.handleSearchRangee(this.rangeeId);
    this.handleSearchdepot(this.depotId);
    this.newProductForGroup=this.fb.group({
      ProductId:this.fb.control(null)
    });
  }

 // get depot from url
  handleSearchdepot(depotId:number) {
    //let kw=this.searchFormGroup?.value.keyword;
    this.gestionDepotService.getDepotById(depotId).subscribe(
      data=>{
        this.depot=data;

        console.log(data);
      }
    )
  }
  handleSearchRangee( rangeeId:number) {
    //let kw=this.searchFormGroup?.value.keyword;
    this.gestionDepotService.getRangeeById(rangeeId).subscribe(
      data=>{
        this.rangee=data;
        console.log(data);
      }
    )
  }

  handleSearchProducts() {
    //let kw=this.searchFormGroup?.value.keyword;
    this.products=this.gestionDepotService.getProducts().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  /*handleSearchProducts() {
    //let kw=this.searchFormGroup?.value.keyword;
    this.gestionDepotService.getProductByRangeeID(this.rangeeId).subscribe(
      data=>{
        this.products=data;
        console.log(data);
      }
    )
  }*/

  handleAddProductToRangee() {

    this.productID = this.newProductForGroup.get('ProductId')?.value;

    //console.log("product ID:" +this.productID);
    //console.log("rangee ID:" +this.rangee.id);
    this.gestionDepotService.addProductToRangeeFromDepot(this.depot.id,this.rangeeId,this.productID).subscribe({
      next:data=>{
        alert("Product "+ this.productID+" successfully added to "+this.rangee.nom);
        //this.newCustomerForGroup.reset()
        this.router.navigateByUrl("/depots").then(r => console.log(r)); // navigate to products page  after saving  the product
      },error: err => {

        alert( this.rangee.nom +" are full");
        console.log( err.value);
        this.newProductForGroup.reset()
      }
    });

  }
}
