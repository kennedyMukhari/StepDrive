import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html',
})
export class OnBoardingPage {
  @ViewChild('slides') slides: Slides
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
  }
  nextslides(){
    this.slides.slideNext();
  }
  formPage(val) {
    if (val == 0) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.setRoot(RegisterPage);
    }
  }
}
