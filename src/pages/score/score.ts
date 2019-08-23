import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { HomePage } from '../home/home';

// import { DataStoreProvider} from '../../providers/datastore';


/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {
  results: number = 0;
  value:string;
  pass: boolean ;
  fail: boolean ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.res();
  }

  ionViewDidLoad() {
   this.results = this.navParams.get('score');
   if(this.results < 50){
    this.value = "There are some things you did not  get right, "+this.results+"%";
    this.fail=true; this.pass = true;
  }else{
    this.value = "well done goodluck with your lesson for tommrow   "+this.results+"%";
    this.fail=false; this.pass = true;
  }
   console.log(
     'results', this.results
   );
   
  }

  res(): void {
    this.results = this.navParams.get('results');
    this.changeValue();
  }

  changeValue(){
      if(this.results < 50){
        this.value = "There are some things you did not get right,   "+this.results+"%";
        this.fail=true; this.pass = true;
      }else{
        this.value = "well done goodluck with your lesson for tommrow  "+this.results+"%";
        this.fail=false; this.pass = true;
      }
  }
  quiz(){
    this.navCtrl.push(QuizPage)
  }
home(){
  this.navCtrl.push(HomePage)
}
  // category(){
  //   this.navCtrl.push(CategoryPage);
  // }

  // category1(){
  //   this.results = 0;
  //   this.navCtrl.push(PoliticsPage);
  // }
}