import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Rules} from "../../model/rules.model";

@Component({
  selector: 'app-apriori',
  templateUrl: './apriori.component.html',
  styleUrls: ['./apriori.component.css']
})
export class AprioriComponent {
  filePath: any;
  rules!: Observable<Array<Rules>>;

  onSubmit() {
    console.log(this.filePath);
  }

  onFileChange($event: Event) {
    this.filePath = ($event.target as HTMLInputElement).files;
    console.log(this.filePath);
  }


  getFiledetials(element: any) {

          console.log(element.value);

  }


  //encode url file to base64
  encodeImageFileAsURL(element: any) {

  }
  uploadFileToActivity() {

  }

  fileChangeEvent($event: any) {
   console.log($event.target.files[0] )
  }
}
