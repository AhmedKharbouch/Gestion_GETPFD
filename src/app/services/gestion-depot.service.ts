import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {environment} from "../../environments/environment";
import {Depot} from "../model/depot.model";
import {Rangee} from "../model/rangee.model";

@Injectable({
  providedIn: 'root'
})
export class GestionDepotService {

  constructor(private  http:HttpClient) { }

  public getDepots():Observable<Array<Depot>>{
    return this.http.get<Array<Depot>>(environment.backendDepot+"/depots")
  }
  public searchDepots(keyword:string):Observable<Array<Depot>>{
    return this.http.get<Array<Depot>>(environment.backendHost+"/customers/search?keyword="+keyword)
  }

  public saveDepot(depot:Depot):Observable<Depot>{
    return this.http.post<Depot>(environment.backendDepot+"/addProduct",depot);
  }
  public updateDepot(depot:Depot):Observable<Depot>{
    return this.http.post<Depot>(environment.backendDepot+"/updateProduct",depot);
  }
  public deleteDepot(id:number){
    return this.http.delete(environment.backendDepot+"/deleteDepot/"+id);
  }

  //get depot by id
  public getDepotById(id:number):Observable<Depot>{
    return this.http.get<Depot>(environment.backendDepot+"/depots/"+id);
  }

  // all function for rangee

  public getRangees():Observable<Array<Rangee>>{
    return this.http.get<Array<Rangee>>(environment.backendDepot+"/rangees")


  }

  public getProductByRangeeID(rangeeID:number):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.backendDepot+"/productsOfRangee/"+rangeeID)
  }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.backendDepot+"/products")
  }
  public searchRangees(keyword:string):Observable<Array<Rangee>>{
    return this.http.get<Array<Rangee>>(environment.backendDepot+"/customers/search?keyword="+keyword)
  }

  public saveRangee(rangee:Rangee):Observable<Rangee>{
    return this.http.post<Rangee>(environment.backendDepot+"/addProduct",rangee);


  }

  public updateRangee(rangee:Rangee):Observable<Rangee>{
    return this.http.post<Rangee>(environment.backendDepot+"/updateProduct",rangee);
  }
  public deleteRangee(id:number){
    return this.http.delete(environment.backendDepot+"/deleteProduct/"+id);
  }
  public deleteRangeefromdepot(rangeeId:number,depotId:number){
    return this.http.delete(environment.backendDepot+"/deleteRangeeFromDepot/"+rangeeId+"/"+depotId);
  }
  public searchRangeesByDepotId(id:number):Observable<Array<Rangee>>{
    return this.http.get<Array<Rangee>>(environment.backendDepot+"/rangeesOfDepot/"+id)
  }

//add rangee to depot
  public addRangeeToDepot(rangeeId:number,depotId:number):Observable<null>{
    return this.http.post<null>(environment.backendDepot+"/addRangeeToDepot/"+rangeeId+"/"+depotId,null);

  }

  //get rangee by id
  public getRangeeById(id:number):Observable<Rangee>{
    return this.http.get<Rangee>(environment.backendDepot+"/rangees/"+id);
  }

  // add product to rangee from depot
  public addProductToRangeeFromDepot(depotId:number,rangeeId:number,productId:number):Observable<null>{
    return this.http.post<null>(environment.backendDepot+"/addProductToRangee/"+depotId+"/"+rangeeId+"/"+productId,null);

  }

  //delete product from rangee
  public deleteProductFromRangee(depotId:number,rangeeId:number,productId:number):Observable<null>{
    return this.http.delete<null>(environment.backendDepot+"/deleteProductFromRangee/"+depotId+"/"+rangeeId+"/"+productId);

  }


}
