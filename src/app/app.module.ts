import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BankingHomeComponent } from './banking-home/banking-home.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { NewCategoryComponent } from './category/new-category/new-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { NewDepotComponent } from './depot/new-depot/new-depot.component';
import { ListDepotsComponent } from './depot/list-depots/list-depots.component';
import { UpdateDepotComponent } from './depot/update-depot/update-depot.component';
import { ListRangeeComponent } from './Rangee/list-rangee/list-rangee.component';
import { RangeeDepotComponent } from './Rangee/rangee-depot/rangee-depot.component';
import { AddrangeeTodepotComponent } from './depot/addrangee-todepot/addrangee-todepot.component';
import { NewFournisseurComponent } from './fournisseur/new-fournisseur/new-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { UpdateFournisseurComponent } from './fournisseur/update-fournisseur/update-fournisseur.component';
import { KafkaStreamsComponent } from './analytic/kafka-streams/kafka-streams.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { AddproductsRangeeComponent } from './Rangee/addproducts-rangee/addproducts-rangee.component';
import { AprioriComponent } from './analytic/apriori/apriori.component';

export function kcFactory(kcService: KeycloakService) {
  return ()=> {

    kcService.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'Gestion-GETPFD',
        clientId: 'GETPFD_Front_APP'
      },
      initOptions: {
        //onLoad: 'login-required',
        onLoad: 'check-sso',
        checkLoginIframe: true
      }
    })
  }
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BankingHomeComponent,
    ListProductsComponent,
    NewProductComponent,
    ListCategoriesComponent,
    NewCategoryComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    NewDepotComponent,
    ListDepotsComponent,
    UpdateDepotComponent,
    ListRangeeComponent,
    RangeeDepotComponent,
    AddrangeeTodepotComponent,
    NewFournisseurComponent,
    ListFournisseurComponent,
    UpdateFournisseurComponent,
    KafkaStreamsComponent,
    AddproductsRangeeComponent,
    AprioriComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule, //ici on ajoute le module http client
        ReactiveFormsModule,
        FormsModule,
        KeycloakAngularModule,
    ],
  providers: [
    {
      //add provider for APP_INITIALIZER
      provide: APP_INITIALIZER,deps:[KeycloakService],useFactory: kcFactory,multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
