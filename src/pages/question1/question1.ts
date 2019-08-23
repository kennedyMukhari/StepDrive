import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { ScorePage } from '../score/score';
import { Question2Page } from '../question2/question2';

/**
 * Generated class for the Question1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question1',
  templateUrl: 'question1.html',
})
export class Question1Page {
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


  score1 : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data:DatastoreProvider  ) {
   
    
  }
  ionViewDidLoad() {
    this.data.getData().subscribe(data => {this.Politics = data.Politics});

    // console.log('polotics', this.Politics);
    this.score1 = this.navParams.get('score');
    console.log('The answer is ', this.score1);
    
  }




  checkAnswer2(){
   
    if(this.answer2 == "Communist Party"){
      this.count2 += 1;
      if(this.count2 == 1)
      this.score1 += 20;
    }else{
      this.score += 0;
    }
   
  }

  checkAnswer1(){
   
   
    this.navCtrl.push(Question2Page, {score : this.score1})
  }
 
  results(): void{
    // if(this.CountNumber < 5){

    //   let alert = this.alert.create({
    //     title: 'Please answer all questions',
    //     subTitle: '',
    //     buttons: ['OK']
    //   });
    //   alert.present();

    // }else{
      this.navCtrl.push(ScorePage , {results : this.score});
    // }
   

  }
}
