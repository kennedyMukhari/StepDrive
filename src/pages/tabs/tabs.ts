import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { QuizPage } from '../quiz/quiz';
import { YouPage } from '../you/you';
import { NavController, Tabs } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('tabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = QuizPage;
  tab3Root = YouPage;
  tab4Root = ProfilePage;
  tab5Root = AboutPage;
  constructor(public navCtrl: NavController) {

  }
  async quizpage(){
    if (this.tabs.getSelected().tabTitle == 'Quiz') {
      await this.navCtrl.setRoot(QuizPage);
    }
  }
}
