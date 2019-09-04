import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScorePage } from '../score/score';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { Question4Page } from '../question4/question4';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-question3',
  templateUrl: 'question3.html',
})
export class Question3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public data:DatastoreProvider  ) {


  }
  ionViewDidLoad() {

  }
}
