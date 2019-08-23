import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the DatastoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatastoreProvider {
  
  constructor(public http: Http) {
    console.log('Hello DataStoreProvider Provider');
  }

  
  getData(){
    return this.http.get('../../assets/data/Thedata.json').map(res => res.json());
 }
 }