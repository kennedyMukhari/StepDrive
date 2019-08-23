import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { firebaseConfig } from '../app/Enveronment';
import * as firebase from 'firebase';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { QuizPage } from '../pages/quiz/quiz';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';
import { ScorePage } from '../pages/score/score';
import { CoverQuizPage } from '../pages/cover-quiz/cover-quiz';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CoverQuizPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
  }
}
