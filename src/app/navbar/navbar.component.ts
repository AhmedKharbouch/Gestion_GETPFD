import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(public securityService:SecurityService) { }

  ngOnInit(): void {
  }
  async login() {
    await this.securityService.kcService.login({
      redirectUri: window.location.origin
    });
  }

  async logout() {
    await this.securityService.kcService.logout(window.location.origin);
  }

  //hasRole returns true if the user has the role passed in
  public hasRole(roles:string):boolean{
    return this.securityService.hasRole(roles);
  }
  // has role USER
  public hasRoleUser():boolean{
    return this.securityService.hasRole("USER");
  }
  /// has role ADMIN
  public hasRoleAdmin():boolean{
    return this.securityService.hasRole("ADMIN");
  }

  //get user role

  // has any role
  public hasAnyRole():boolean{
    return this.securityService.kcService.getUserRoles().length>0;
  }

  // register user
  public register() {
    return this.securityService.kcService.register();
  }
  changePassword() {

  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
