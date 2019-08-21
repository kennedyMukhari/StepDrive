import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Quiz } from '../../app/model/Quiz.model';
/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  total:any;
  title: string;
  questions: any;
  lastSlide: any = false;
  grandTotal: number = 0;
  quiz = [];
  @ViewChild('slides') slides: Slides;
  datastoreProv: any;
  ShowButton : boolean = false;
  count : number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.quiz = Quiz;
    console.log(Quiz);
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    this.title = this.navParams.data;
    // this.questions = this.datastoreProv.questions;
    console.log(this.questions);
    this.slides.lockSwipeToPrev(true);
  
  }
  getCorrect(value){
    this.count += 1;
    if (value == true){  
      this.setTotal(20);
      if (this.count = 5)
      this.ShowButton == true;
    } else {
      console.log('False');
      
    }
    this.slides.slideNext();
    if (this.slides.isEnd() == true){
      this.lastSlide = true;
    }
    
  }
  // toResults(){
  //   this.navCtrl.push(ScorePage);
  // }
  // reset(){
  //   this.grandTotal=0;
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