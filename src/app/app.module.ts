import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    CustomerAccountsComponent,
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

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule, //ici on ajoute le module http client
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
