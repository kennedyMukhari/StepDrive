import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Slides
} from 'ionic-angular';
import {
  ScorePage
} from '../score/score';
import {
  DatastoreProvider
} from '../../providers/datastore/datastore';


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  landing = {
    active: true,
    inactive: false
  }
  @ViewChild('slide') slides: Slides;
  grandTotal = 0;
  questions: Array < QUESTION > = [
    {
    question: 'Reprehenderit laboris adipisicing qui do.',
    options: [{
        option: 'Option 1',
        correct: true
      },
      {
        option: 'Option 2',
        correct: false
      },
      {
        option: 'Option 3',
        correct: false
      },
      {
        option: 'Option 4',
        correct: false
      }
    ]
  },{
    question: 'Sono da non. E esperienza con e forza noia volta alli impermutabile io. Uomini propria quale dea quali sua fu. ',
    options: [{
        option: 'Option 1',
        correct: true
      },
      {
        option: 'Option 2',
        correct: false
      },
      {
        option: 'Option 3',
        correct: false
      },
      {
        option: 'Option 4',
        correct: false
      }
    ]
  },{
    question: 'E apparire donne noi raccontare non lui. Infiniti temporali divina essaudisce dovendo.',
    options: [{
        option: 'Option 1',
        correct: true
      },
      {
        option: 'Option 2',
        correct: false
      },
      {
        option: 'Option 3',
        correct: false
      },
      {
        option: 'Option 4',
        correct: false
      }
    ]
  },{
    question: 'Viviamo alle e piaceri alla audaci in come né la. Volta beati con fa cosa piene piú divenuti e infiniti. Delle potendo a di alli transitorie accio in e esser. Intendo ora. Noi degli.',
    options: [{
        option: 'Option 1',
        correct: true
      },
      {
        option: 'Option 2',
        correct: false
      },
      {
        option: 'Option 3',
        correct: false
      },
      {
        option: 'Option 4',
        correct: false
      }
    ]
  },{
    question: "E siamo e di né udita fosse sí sua. In l'acume fermi. L'uomo quale impetrata di che credere. Beati degli noi di. Se fosse impetrata tutte infiniti beati colui cose alle. Transitorie procuratore benignita che di principio se.",
    options: [{
        option: 'Option 1',
        correct: true
      },
      {
        option: 'Option 2',
        correct: false
      },
      {
        option: 'Option 3',
        correct: false
      },
      {
        option: 'Option 4',
        correct: false
      }
    ]
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DatastoreProvider) {}
  ionViewDidLoad() {this.slides.lockSwipes(true);this.grandTotal = 0;}
  start() {
    this.landing.inactive = true;
  }
  checkAnswer(value) {
    console.log(value);

    if(this.slides.isEnd()) {
      if (value) {
        this.grandTotal += 20;
        this.navCtrl.setRoot(ScorePage, this.grandTotal)
      } else {
        this.navCtrl.setRoot(ScorePage, this.grandTotal)
      }
    } else {
      if (value) {
        this.grandTotal += 20;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      } else {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }
    }
  }

  results(): void {}
}
export interface QUESTION {
  question: string;
  options: [{
      option: string,
      correct: boolean
    },
    {
      option: string,
      correct: boolean
    },
    {
      option: string,
      correct: boolean
    },
    {
      option: string,
      correct: boolean
    }
  ]
}
