import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { firebaseConfig } from '../app/Enveronment';
import * as firebase from 'firebase';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import {google} from 'google-maps'
declare var google: any;
declare var google;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,public statusBar: StatusBar, splashScreen: SplashScreen, private screenOrien: ScreenOrientation, public storage: Storage) {
    platform.ready().then(async () => {
      statusBar.backgroundColorByHexString('#D28B2B');
      if (platform.is('android')) {
        // screenOrien.lock(this.screenOrien.ORIENTATIONS.PORTRAIT);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      setTimeout(()=>{
        splashScreen.hide();
      }, 2000)
      this.storage.get('onboarding').then((res) => {
        if (res) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = OnBoardingPage;
        }
      })
    });
    firebase.initializeApp(firebaseConfig);
  }
}
