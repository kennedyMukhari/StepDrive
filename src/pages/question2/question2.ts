import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScorePage } from '../score/score';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { Question3Page } from '../question3/question3';
/**
 * Generated class for the Question2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question2',
  templateUrl: 'question2.html',
})
export class Question2Page {
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

    // console.log('polotics', this.Politics);
    this.score1 = this.navParams.get('score');
    console.log('the score is ', this.score1);
    
  }


  checkAnswer3(){
   
    if(this.answer3 == "The President of SA in consultation with the Judicial Services Commission"){
      this.count3 += 1;
      if(this.count3 == 1)
      this.score1 += 20;
    }else{
      this.score1 += 0;
    }
    this.navCtrl.push(Question3Page, {score : this.score1})
  }

radio3(){
  this.navCtrl.push(Question3Page)
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

