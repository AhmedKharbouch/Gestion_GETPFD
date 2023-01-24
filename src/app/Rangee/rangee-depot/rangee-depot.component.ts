import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {Category} from "../../model/category.model";
import {UntypedFormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Depot} from "../../model/depot.model";
import {Rangee} from "../../model/rangee.model";
import {GestionDepotService} from "../../services/gestion-depot.service";


@Component({
  selector: 'app-rangee-depot',
  templateUrl: './rangee-depot.component.html',
  styleUrls: ['./rangee-depot.component.css']
})
export class RangeeDepotComponent implements OnInit {

  //depot:Depot=this.router.getCurrentNavigation()?.extras.state as Depot;
  depot!:Depot;
  depotId:number= Number(this.router.routerState.snapshot.url.split("/")[2]);
  product1!:Product;
  rangee!:Observable<Array<Rangee>>;
  categoryId!:Category;
  errorMessage!: string;


  constructor(private fb:UntypedFormBuilder,private gestionDepotService:GestionDepotService,private  router:Router) { }

  ngOnInit(): void {
    this.depotId = Number(this.router.routerState.snapshot.url.split("/")[2]);
    this.handleSearchdepot(this.depotId);
    console.log(this.depotId);
    this.handleSearchProducts(this.depotId);
  }

  handleSearchdepot(depotId:number) {
    //let kw=this.searchFormGroup?.value.keyword;
    this.gestionDepotService.getDepotById(depotId).subscribe(
      data=>{
        this.depot=data;
        console.log(data);
      }
    )
  }

  handleSearchProducts(depotId:number) {
    //let kw=this.searchFormGroup?.value.keyword;
    this.rangee=this.gestionDepotService.searchRangeesByDepotId(depotId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  handleProductRangee(depot: Depot, rangee: Rangee) {
    this.router.navigateByUrl("/addProductToRangee/"+depot.id+"/"+rangee.id,{state:depot})
  }

  handleDeleteRangee(r: Rangee, depotId: number) {
    let conf =confirm("Are you sure?");
    console.log(r.id);
    console.log(depotId);
    if(!conf) return;
    this.gestionDepotService.deleteRangeefromdepot(r.id,depotId).subscribe({
      next:(resp)=>{
        this.rangee=this.rangee.pipe(
          map(data=>{
            let index=data.indexOf(r);
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

}
