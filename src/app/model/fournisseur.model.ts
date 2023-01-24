import {TypeFournisseur} from "./typeFournisseur.model";

export interface Fournisseur {
  id:            number;
  nom:          string;
  telephone : string;
  telephoneFixe : string;
  email   : string;
  adresse : string;
  ville : string;
  createdAt:     Date;
  modifiedAt:     Date;
  categoryId:number;
  typeFournisseur:TypeFournisseur;
  typeFsrId:number;


}

