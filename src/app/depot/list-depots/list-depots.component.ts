import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "../../model/product.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Category} from "../../model/category.model";
import {Depot} from "../../model/depot.model";
import {Rangee} from "../../model/rangee.model";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {GestionDepotService} from "../../services/gestion-depot.service";
import {AppComponent} from "../../app.component";
import {SecurityService} from "../../services/security.service";

@Component({
  selector: 'app-list-depots',
  templateUrl: './list-depots.component.html',
  styleUrls: ['./list-depots.component.css']
})
export class ListDepotsComponent implements OnInit {
  depots! : Observable<Array<Depot>>;
  errorMessage! :String;
  searchFormGroup! :UntypedFormGroup;
  rangees!:Observable<Array<Rangee>>;
  counter!:number;
  constructor(private app:AppComponent, private gestionDepotService:GestionDepotService, private productService:ProductService,private fb:UntypedFormBuilder,private router:Router,private securityService:SecurityService) { }

  ngOnInit(): void {

    //this.depots=this.gestionDepotService.getDepots();
    this.handleSearchDepots()
  }
  handleSearchDepots() {
    let kw=this.searchFormGroup?.value.keyword;
    this.depots=this.gestionDepotService.getDepots().pipe(
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


  handleDeleteDepot(c: Depot) {

    let conf =confirm("Are you sure? there is probably rangees in this depot");
    if(!conf) return;
    this.gestionDepotService.deleteDepot(c.id).subscribe({
      next:(resp)=>{
        this.depots=this.depots.pipe(
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

  handleUpdateDepot(depot: Depot) {
    this.router.navigateByUrl("/update-product/"+depot.id,{state:depot})
  }

  SearchDepotRangee(depot: Depot) {
    this.router.navigateByUrl("/rangee-depot/"+depot.id,{state:depot})
  }

  AddRangeeToRangee(depot: Depot) {
    this.router.navigateByUrl("/addrangeetodepot/"+depot.id,{state:depot})
  }
}
