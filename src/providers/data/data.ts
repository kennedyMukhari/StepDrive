import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataProvider {
  questions: any;
  grandTotal: number = 0;
  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }
  setQuestions(value){
    this.questions = value;
  }
  setTotal(val){
    this.grandTotal += val;
    console.log(this.grandTotal);

  }
  reset(){
    this.grandTotal=0;
}
controlTab(val) {
}
}
