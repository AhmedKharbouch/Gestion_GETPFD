import { Injectable } from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public profile?: KeycloakProfile;
  constructor(public kcService:KeycloakService) {
    this.init();
  }

  private init() {
    this.kcService.keycloakEvents$.subscribe((e)=> {
      if(e.type === KeycloakEventType.OnAuthSuccess){
        this.kcService.loadUserProfile().then((profile)=>{this.profile = profile}
        ) ;
      }
    })
  }
  public hasRole(roles:string):boolean{
    let userRoles = this.kcService.getUserRoles();
    for(let r of userRoles){
      if(r.includes(roles)) return true;

    } return false;
  }
}
