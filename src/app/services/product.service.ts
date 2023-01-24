import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  http:HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.backendHost+"/products")
  }
  public searchProducts(keyword:string):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.backendHost+"/customers/search?keyword="+keyword)
  }

  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(environment.backendHost+"/addProduct",product);
  }
  public updateProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(environment.backendHost+"/updateProduct",product);
  }
  public deleteProduct(id:number){
    return this.http.delete(environment.backendHost+"/deleteProduct/"+id);
  }

  // get products by category nom
  public getProductsByCategoryNom(nom:string):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.backendHost+"/productsByCategory/"+nom)
  }

  //get products by id
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(environment.backendHost+"/products/"+id);
  }


}
