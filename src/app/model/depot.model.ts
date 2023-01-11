import {Category} from "./category.model";
import {AccountOperation} from "./account.model";
import {Rangee} from "./rangee.model";
import {Observable} from "rxjs";

export interface Depot {
  id:            number;
  nom:          string;
  maxSize:    number;
  currentSize: number;
  modifiedAt:     Date;
  createdAt:     Date;
  //rangee: Rangee[];
  rangee:Observable<Array<Rangee>>;

}

