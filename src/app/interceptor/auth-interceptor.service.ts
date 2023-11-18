import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add bearer token to request header
    let token = localStorage.getItem("token");
    if(token){
      let cloneReq = req.clone({
        headers: req.headers.set("Authorization","Bearer "+token)
      });
      return next.handle(cloneReq);
  }
    return next.handle(req);
  }
}
