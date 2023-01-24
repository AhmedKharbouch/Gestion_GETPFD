import {Depot} from "./depot.model";
import {Product} from "./product.model";

export interface Rangee {
  id:            number;
  nom:          string;
  //accountOperationDTOS: AccountOperation[];
  createdAt:     Date;
  modifiedAt:     Date;
  maxSize:    number;
  currentSize: number;
  product: Product[];
  productsIds : number[];


}

