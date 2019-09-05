import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

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
