import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html',
})
export class OnBoardingPage {
  @ViewChild('slides') slides: Slides
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('onboarding').then((res) => {
      if (res) {
        this.navCtrl.setRoot(LoginPage);
      }
    })
  }
  nextslides(){
    this.slides.slideNext();
  }
  formPage(val) {
    this.storage.set('onboarding', true);
    if (val == 0) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.setRoot(RegisterPage);
    }
  }
}
