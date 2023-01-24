import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private  http:HttpClient) { }

  public getCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.backendHost+"/categories")
  }
  public getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(environment.backendHost+"/categories/"+id);
  }
  public searchCategories(keyword:string):Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.backendHost+"/searchCategory/"+keyword)
  }

  public saveCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(environment.backendHost+"/addCategory",category);
  }
  public updateCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(environment.backendHost+"/updateCategory",category);
  }
  public deleteCategory(id:number){
    return this.http.delete(environment.backendHost+"/deleteCategory/"+id);
  }

}
