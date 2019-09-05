import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
/*
  Generated class for the SchoolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchoolsProvider {
  db = firebase.firestore();
  constructor(public http: HttpClient) {
    console.log('Hello SchoolsProvider Provider');
  }
  getSchools(start, end) {
    this.db.collection('drivingschools').limit(7).orderBy('schoolname', 'asc').startAt(start).endAt(end).get().then(res => {
      return res;
    })
  }
}
