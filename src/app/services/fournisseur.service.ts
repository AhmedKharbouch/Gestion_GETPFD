import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {environment} from "../../environments/environment";
import {Fournisseur} from "../model/fournisseur.model";
import {Category} from "../model/category.model";
import {TypeFournisseur} from "../model/typeFournisseur.model";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private  http:HttpClient) { }

  //create all methods for CRUD operations
  public getFournisseurs():Observable<Array<Fournisseur>>{
    return this.http.get<Array<Fournisseur>>(environment.backendFSR+"/fournisseurs")
  }
  public searchFournisseurs(keyword:string):Observable<Array<Fournisseur>>{
    return this.http.get<Array<Fournisseur>>(environment.backendFSR+"/searchFsr/"+keyword)
  }
  //get fournisseur by id
  public getFournisseur(id:number):Observable<Fournisseur>{
    return this.http.get<Fournisseur>(environment.backendFSR+"/fournisseurs/"+id)
  }
  //add new fournisseur
  public saveFournisseur(fournisseur:Fournisseur):Observable<Fournisseur>{
    return this.http.post<Fournisseur>(environment.backendFSR+"/addfournisseurs",fournisseur);
  }
  //get typeFournisseur by id
  public getTypeFsrById(id:number):Observable<TypeFournisseur>{
    return this.http.get<TypeFournisseur>(environment.backendFSR+"/types/"+id)
  }

  //update fournisseur
  public updateFournisseur(fournisseur:Fournisseur):Observable<Fournisseur>{
    return this.http.put<Fournisseur>(environment.backendFSR+"/updateFsr",fournisseur);
  }
  //delete fournisseur
  public deleteFournisseur(id:number){
    return this.http.delete(environment.backendFSR+"/fournisseurs/"+id);
  }

  //get all typeFournisseur
  public getTypeFournisseurs():Observable<Array<TypeFournisseur>>{
    return this.http.get<Array<TypeFournisseur>>(environment.backendFSR+"/types")

  }




}
