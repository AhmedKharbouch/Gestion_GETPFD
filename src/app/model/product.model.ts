import {Category} from "./category.model";

export interface Product {
  id:            number;
  label:          string;
  prix_HT:    number;
  prix_TT: number;
  quantite:              number;
  createdAt:     Date;
  modifiedAt:     Date;
  categoryId:number;
  category:Category;


}

