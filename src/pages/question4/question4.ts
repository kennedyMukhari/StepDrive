import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatastoreProvider } from '../../providers/datastore/datastore';
import { Question3Page } from '../question3/question3';
import { Question2Page } from '../question2/question2';

@IonicPage()
@Component({
  selector: 'page-question4',
  templateUrl: 'question4.html',
})
export class Question4Page {


  constructor(public navCtrl: NavController, public navParams: NavParams, public data:DatastoreProvider, public popover: PopoverController ) {


  }
  ionViewDidLoad() {

  }
  aboutUs() {
    this.popover.create(Question2Page).present()
  }
  disclaimer() {
    this.popover.create(Question3Page).present()
  }
}
