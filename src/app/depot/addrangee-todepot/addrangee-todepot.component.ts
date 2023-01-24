import { Component, OnInit } from '@angular/core';
import {Depot} from "../../model/depot.model";
import {Product} from "../../model/product.model";
import {catchError, Observable, throwError} from "rxjs";
import {Rangee} from "../../model/rangee.model";
import {Category} from "../../model/category.model";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {GestionDepotService} from "../../services/gestion-depot.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addrangee-todepot',
  templateUrl: './addrangee-todepot.component.html',
  styleUrls: ['./addrangee-todepot.component.css']
})
export class AddrangeeTodepotComponent implements OnInit {
  depot!: Depot;
  depoId!:number;

  product1!:Product;
  rangee!:Observable<Array<Rangee>>;
  categoryId!:Category;
  newProductForGroup! :UntypedFormGroup
  rangeeId!:number;
  errorMessage!: string;
  constructor(private fb:UntypedFormBuilder,private gestionDepotService:GestionDepotService,private  router:Router) { }

  ngOnInit(): void {
    this.depoId= Number(this.router.routerState.snapshot.url.split("/")[2]) ;
    this.handleSearchdepot()
    this.handleSearchRangee();
    this.newProductForGroup=this.fb.group({
      rangeeId:this.fb.control(null)
    });
  }

  handleSearchRangee() {
    //let kw=this.searchFormGroup?.value.keyword;
    this.rangee=this.gestionDepotService.getRangees().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  handleSearchdepot() {
    //let kw=this.searchFormGroup?.value.keyword;
    this.gestionDepotService.getDepotById(this.depoId).subscribe(
      data=>{
        this.depot=data;
        console.log(data);
      }
    )
  }

  handleAddRangee() {

     this.rangeeId = this.newProductForGroup.get('rangeeId')?.value;

      console.log("rangee ID:" +this.rangeeId);
      console.log("depot ID:" +this.depot.id);
        this.gestionDepotService.addRangeeToDepot(this.depot.id, this.rangeeId).subscribe({
          next:data=>{
            alert("Rangee "+ this.rangeeId+" successfully added to "+this.depot.nom);
            //this.newCustomerForGroup.reset()
            this.router.navigateByUrl("/depots").then(r => console.log(r)); // navigate to products page  after saving  the product
          },error: err => {

            alert( this.depot.nom +" are full");
            console.log( err.value);
            this.newProductForGroup.reset()
          }
        });

  }
}
