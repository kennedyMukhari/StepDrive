import { Component } from '@angular/core';
import { Platform, NavController, IonicApp, AlertController, App } from 'ionic-angular';
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

  constructor(public platform: Platform,public statusBar: StatusBar, splashScreen: SplashScreen, private screenOrien: ScreenOrientation, public storage: Storage, public alertCtrl: AlertController, public app: App) {
    statusBar.backgroundColorByHexString('#D28B2B');

    platform.ready().then(async () => {
      this.initialiseApp()
      platform.backButton.subscribe(res => {
        console.log('back Clicked');

      })
      if (platform.is('android')) {
        // screenOrien.lock(this.screenOrien.ORIENTATIONS.PORTRAIT);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      setTimeout(() => {

      }, 2000)
      this.storage.get('onboarding').then((res) => {
        if (res) {
          // splashScreen.hide();
          this.rootPage = LoginPage;
        } else {
          // splashScreen.hide();
          this.rootPage = OnBoardingPage;
        }
      })
    });
    firebase.initializeApp(firebaseConfig);
  }
  initialiseApp() {
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      // Checks if can go back before show up the alert
      if(activeView.name === 'HomePage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
              const alert = this.alertCtrl.create({
                  title: 'Fechar o App',
                  message: 'Você tem certeza?',
                  buttons: [{
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: () => {
                        this.nav.setRoot('HomePage');
                        console.log('** Saída do App Cancelada! **');
                      }
                  },{
                      text: 'Fechar o App',
                      handler: () => {
                        this.logout();
                        this.platform.exitApp();
                      }
                  }]
              });
              alert.present();
          }
      }
  });
  }
}
