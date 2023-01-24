import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private  securityService:SecurityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepting request")
    if (!this.securityService.profile) return next.handle(req);
    console.log("adding token")
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.securityService.kcService.getToken()}`
      }
    });
    return next.handle(req);

  }




    }
