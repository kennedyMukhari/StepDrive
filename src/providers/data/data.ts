import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2 } from '@angular/core';
import { Http } from '@angular/http';
import { Keyboard } from 'ionic-angular';

@Injectable()
export class DataProvider {
  questions: any;
  grandTotal: number = 0;
  constructor(public http: Http, public keybrd: Keyboard) {
    console.log('Hello DataProvider Provider');
  }
  checkKeyboard(state) {


    if (state == 'open') {

    } else if (state == 'closed') {

    }
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
