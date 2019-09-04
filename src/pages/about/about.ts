import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Question2Page } from '../question2/question2';
import { Question3Page } from '../question3/question3';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public popover: PopoverController) {

  }
  aboutUs() {
    this.popover.create(Question2Page).present()
  }
  disclaimer() {
    this.popover.create(Question3Page).present()
  }
}
