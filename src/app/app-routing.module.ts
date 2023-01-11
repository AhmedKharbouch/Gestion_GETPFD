import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {BankingHomeComponent} from "./banking-home/banking-home.component";
import {ListProductsComponent} from "./product/list-products/list-products.component";
import {NewProductComponent} from "./product/new-product/new-product.component";
import {ListCategoriesComponent} from "./category/list-categories/list-categories.component";
import {NewCategoryComponent} from "./category/new-category/new-category.component";
import {UpdateCategoryComponent} from "./category/update-category/update-category.component";
import {UpdateProductComponent} from "./product/update-product/update-product.component";
import {ListDepotsComponent} from "./depot/list-depots/list-depots.component";
import {ListRangeeComponent} from "./Rangee/list-rangee/list-rangee.component";
import {RangeeDepotComponent} from "./Rangee/rangee-depot/rangee-depot.component";
import {AddrangeeTodepotComponent} from "./depot/addrangee-todepot/addrangee-todepot.component";
import {ListFournisseurComponent} from "./fournisseur/list-fournisseur/list-fournisseur.component";
import {UpdateFournisseurComponent} from "./fournisseur/update-fournisseur/update-fournisseur.component";


const routes: Routes = [
  //ici on configure le path pour les links
  { path:"customers",component:CustomersComponent},
  { path:"accounts",component:AccountsComponent},
  {path:"new-customer",component:NewCustomerComponent},
  {path:"customer-accounts/:id",component:CustomerAccountsComponent},
  {path:"home",component:BankingHomeComponent},
  {path:"products",component:ListProductsComponent},
  {path:"new-product",component:NewProductComponent},
  {path:"update-product/:id",component:UpdateProductComponent},
  {path:"categories",component:ListCategoriesComponent},
  {path:"new-category",component:NewCategoryComponent},
  {path:"update-category/:id",component:UpdateCategoryComponent},
  {path:"depots",component:ListDepotsComponent},
  {path:"rangees",component:ListRangeeComponent},
  {path:"rangee-depot/:id",component:RangeeDepotComponent},
  {path:"rangee-depot",component:RangeeDepotComponent},
  {path:"addrangeetodepot/:id",component:AddrangeeTodepotComponent},
  {path:"fournisseurs",component:ListFournisseurComponent},
  {path:"update-fournisseur/:id",component:UpdateFournisseurComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
