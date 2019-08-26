import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';





import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ProfilePage } from '../pages/profile/profile';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { QuizPage } from '../pages/quiz/quiz';
import { DataProvider } from '../providers/data/data';
import { MapPage } from '../pages/map/map';
import { ScorePage } from '../pages/score/score';
import { DatastoreProvider } from '../providers/datastore/datastore';
import { HttpModule } from '@angular/http';
import { Question1Page } from '../pages/question1/question1';
import { Question2Page } from '../pages/question2/question2';
import { Question3Page } from '../pages/question3/question3';
import { Question4Page } from '../pages/question4/question4';
import { CoverQuizPage } from '../pages/cover-quiz/cover-quiz';
import { YouPage } from '../pages/you/you';
import { IonicStorageModule } from "@ionic/storage";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    OnBoardingPage,
    QuizPage,
    MapPage,
    ScorePage,
    Question1Page,
    Question2Page,
    Question3Page,
    Question4Page,
    CoverQuizPage,
    YouPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    OnBoardingPage,
    QuizPage,
    MapPage,
    ScorePage,
    Question1Page,
    Question2Page,
    Question3Page,
    Question4Page,
    CoverQuizPage,
    YouPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    DatastoreProvider,
    HttpModule
  ]
})
export class AppModule {}
