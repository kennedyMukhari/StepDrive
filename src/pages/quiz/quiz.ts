import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Quiz } from '../../app/model/Quiz.model';
import { HomePage } from '../home/home';
import { ScorePage } from '../score/score';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { Question1Page } from '../question1/question1';


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  
  Politics:any;
  score: number = 0;
  answer1: string ;
  answer2: string ;
  answer3: string ;
  answer4: string ;
  answer5: string ;

  CountNumber: number = 0;
  count1: number = 0;
  count2: number = 0;
  count3: number = 0;
  count4: number = 0;
  count5: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data:DatastoreProvider  ) {
   
    
  }
  ionViewDidLoad() {
    this.data.getData().subscribe(data => {this.Politics = data.Politics});

    console.log('polotics', this.Politics);
    
  }


  checkAnswer1(){

    if(this.answer1 == "Steve Biko"){
      this.count1 += 1;
      if(this.count1 == 1)
      this.score += 20;
    }else{
      this.score += 0;
    }
    this.navCtrl.push(Question1Page, {score: this.score})
  }
  




  results(): void{
  
      this.navCtrl.push(ScorePage , {results : this.score});
  
   

  }
}