import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {KafkaStreamsComponent} from "./analytic/kafka-streams/kafka-streams.component";
import {AddproductsRangeeComponent} from "./Rangee/addproducts-rangee/addproducts-rangee.component";
import {AuthGuard} from "./guards/security.guard";
import {NewFournisseurComponent} from "./fournisseur/new-fournisseur/new-fournisseur.component";
import {AprioriComponent} from "./analytic/apriori/apriori.component";


const routes: Routes = [
  //ici on configure le path pour les links
  {path:"home",component:BankingHomeComponent},
  {path:"products",component:ListProductsComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"new-product",component:NewProductComponent,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"update-product/:id",component:UpdateProductComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"categories",component:ListCategoriesComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"new-category",component:NewCategoryComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"update-category/:id",component:UpdateCategoryComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"depots",component:ListDepotsComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"rangees",component:ListRangeeComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"rangee-depot/:id",component:RangeeDepotComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"rangee-depot",component:RangeeDepotComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"addrangeetodepot/:id",component:AddrangeeTodepotComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"fournisseurs",component:ListFournisseurComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},
  {path:"update-fournisseur/:id",component:UpdateFournisseurComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"kafka",component:KafkaStreamsComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"addProductToRangee/:id/:id",component:AddproductsRangeeComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"new-fsr",component:NewFournisseurComponent ,canActivate: [AuthGuard],data: {roles: ['ADMIN']}},
  {path:"apriori",component:AprioriComponent ,canActivate: [AuthGuard],data: {roles: ['USER']}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
