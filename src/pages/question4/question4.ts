import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScorePage } from '../score/score';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { Question3Page } from '../question3/question3';
/**
 * Generated class for the Question4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question4',
  templateUrl: 'question4.html',
})
export class Question4Page {
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

  score1 : number = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public data:DatastoreProvider  ) {
   
    
  }
  ionViewDidLoad() {
    this.data.getData().subscribe(data => {this.Politics = data.Politics});

   
    this.score1 = this.navParams.get('score');
    console.log('polotics', this.score1);
  }



 

  checkAnswer5(){
   
    if(this.answer5 == "Democratic Alliance"){
      this.count5 += 1;
      if(this.count5 == 1)
      this.score1 += 20;
    }else{
      this.score1 += 0;
    }
   
  }


  checkAnswer1(){
   
    this.navCtrl.push(ScorePage, {score : this.score1})
  }
 
  results(): void{
    
      this.navCtrl.push(ScorePage , {results : this.score});

   

  }
}
