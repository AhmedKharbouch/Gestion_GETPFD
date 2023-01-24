import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }
  getAnalytics() {
    return this.http.get<any>(environment.backendKafka+"/analytics", {responseType: 'text' as 'json'}).pipe(map(data => data));
  }
}
