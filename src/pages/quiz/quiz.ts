
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

  title: string;
  questions: any;
  lastSlide: any = false;
  grandTotal: number;
  quiz = [];
  @ViewChild('slides') slides: Slides;

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

}
