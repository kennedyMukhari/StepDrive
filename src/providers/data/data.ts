import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  questions: any;
  grandTotal: number = 0;
  constructor(public http: HttpClient) {
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
}
