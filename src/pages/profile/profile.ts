import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform, Keyboard } from 'ionic-angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { LocalNotifications} from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('reviews') revs: ElementRef;
  db = firebase.firestore();
  user = {
    uid: '',
    image: null
  }
  request = []
  userReviews = []
  school = {}
  more = {
    cond: false,
    id: 0
  }
  showTips = false;
  count = 0;
  revsOpen = false;
  reviewCardLength = 0;
  review = {
    datecreated: null,
    image: '',
    schooluid: '',
    text: '',
    username: '',
    rating: 0
  }
  reviewDiv: any;
  feedbackDiv: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, private store: Storage, public plt: Platform, public localNot: LocalNotifications, public element: ElementRef, public renderer: Renderer2, public keyb: Keyboard) {
  }
  // get the request of the user
  // get the schooldata where they made the request
  ionViewDidLoad() {
    this.getReviews()
    // check if all the elemnts exist
    if (this.element.nativeElement.children[0].children[1].children[0].children[1]) {
      this.reviewDiv = this.element.nativeElement.children[0].children[1].children[0].children[1]
    }
    if (this.element.nativeElement.children[0].children[1].children[0].children[0].children[2]) {
      this.feedbackDiv = this.element.nativeElement.children[0].children[1].children[0].children[0].children[2]
    }
    if (this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children.length) {
      this.reviewCardLength = this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children.length
    }

    // loop through all the reviews that are in the array
    for (let i = 0; i < this.reviewCardLength; i++) {
       let translate = i % 2;
       console.log('Translate upon load', translate);
      // reference to each card
      let card = this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children[i]
      // console.log('Cards,  ', card);
      if (translate) {
        this.renderer.setStyle(card, 'transform', 'translateX(-100vw)');
      } else {
        this.renderer.setStyle(card, 'transform', 'translateX(100vw)');
      }
    }
    // log the page's native elements for reverence
    let Div = this.element
    console.log(Div);

    this.plt.ready().then(ready=>{
      // after the platform is ready chech if the reference divs are available
      if (this.reviewDiv) {
        this.renderer.setStyle(this.reviewDiv, 'top', '80%');
      }

      if (this.feedbackDiv) {
        this.renderer.setStyle(this.feedbackDiv, 'opacity', '0');
      }
      this.db.collection('bookings').where('uid', '==', this.user.uid).onSnapshot(res=> {
        this.count += 1;
        // if (this.count > 1) {
          // this.pushNotification();
          console.log('Count :' , this.count);

        // }
      })
    })
    console.log('ionViewDidLoad ProfilePage');
    firebase.auth().onAuthStateChanged(res => {
      this.user.uid = res.uid;
      this.db.collection('users').doc(res.uid).get().then(user => {
        if (user.data()) {
          this.user.image = user.data().image;
          this.review.image = user.data().image;
          this.review.username = `${user.data().name}  ${user.data().surname}`
        } else {
          console.log('Got no data');

        }
      })
      this.getBooking()
    })
this.initialiseTips();
this.pushNotification();
  }

  logRatingChange(ev) {
    console.log(ev);
    this.review.rating = ev
    console.log(this.review);

  }
  reviews(event, school) {
    this.review.datecreated = new Date().toDateString();
    console.log('the S', school);
    console.log('Review objet', this.review);
    if (school.request) {
      this.review.schooluid = school.request.schooluid
    }

    let feedbackDiv = this.element.nativeElement.children[0].children[1].children[0].children[0].children[2];

    // reference to the reviews divs
    let cards = this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children.length

    // reference to the review div
    let reviewDiv = this.element.nativeElement.children[0].children[1].children[0].children[0]

    // reference to the device height
      let height =  this.plt.height();
    // log the event
    console.log(event.type);

    // check the event type and the status of the review div
    if (event.type == "click" && !this.revsOpen) {
      // loop through all the divs that hold the reviews and  apply the style depending on the translate result
    for (let i = 0; i < cards; i++) {
      let translate = i % 2;
      console.log('Translate on open', translate);
      // reference to individual divs
      let card = this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children[i]
      // console.log('Cards,  ', card);
      // if translate has a reminder
      if (translate) {
        this.renderer.setStyle(card, 'transform', 'translateX(0vw)');
      } else {
        this.renderer.setStyle(card, 'transform', 'translateX(0vw)');
      }
    }
      this.revsOpen = !this.revsOpen;
      this.renderer.setStyle(reviewDiv, 'top', '10vh');
      this.renderer.setStyle(feedbackDiv, 'opacity', '1');
    } else {


      for (let i = 0; i < cards; i++) {
        let translate = i % 2;
        console.log('Translate on close', translate);

      let card = this.element.nativeElement.children[0].children[1].children[0].children[0].children[1].children[i]
      // console.log('Cards,  ', card);
      if (translate) {
        this.renderer.setStyle(card, 'transform', 'translateX(-100vw)');
      } else {
        this.renderer.setStyle(card, 'transform', 'translateX(100vw)');
      }
    }
    this.revsOpen = !this.revsOpen;
      this.renderer.setStyle(reviewDiv, 'top', '80vh');
      this.renderer.setStyle(feedbackDiv, 'opacity', '0');
    }

    // console.log('Element', reviewDiv)
    if (this.revsOpen == true) {
      let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
          elements[key].style.opacity = '0';
      });
      this.showTips = true;
  }
    } else {
      let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
          elements[key].style.opacity = '1';
      });
      this.showTips = true;
  }
    }
  }
  initialiseTips() {
    let elements = document.querySelectorAll(".tabbar");
    let readTips = null
    this.store.get('readTips').then(res => {
      readTips = res;
    })
setTimeout(() => {
  console.log('readTs: ', readTips);

    if (!readTips) {
      console.log('no tip property');

      if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
            elements[key].style.transition = '0.4s';
        });
        this.showTips = true;
    }

    } else {
      console.log('tip property');
    }
}, 2000);


  }
  closeTips() {
    console.log('tip should close');

    let elements = document.querySelectorAll(".tabbar");
    this.store.set('readTips', true)
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'flex';
            elements[key].style.transition = '0.4s';
        });

    }
    this.showTips = false;
  }

  pushNotification() {
    this.db.collection('bookings').where('uid', '==', this.user.uid).onSnapshot(res => {
      res.forEach(doc => {
        if (doc.data().confirmed == 'accepted' || doc.data().confirmed == 'rejected') {
          this.localNot.schedule({
            id: 1,
            title: 'StepDrive',
            text: 'One of the driving instructors responded to your request.'
          })
        }
      })
    })
  }
  sendReview() {
    this.db.collection('reviews').doc(firebase.auth().currentUser.uid).set(this.review).then(res=> {
      const toaster = this.toastCtrl.create({
        message: 'Thank You',
        duration: 2000
      }).present()
      this.userReviews = []
      this.getReviews()
    }).catch(err => {
      const toaster = this.toastCtrl.create({
        message: 'Oops!'+err.message,
        duration: 2000
      }).present()
    })
  }
  getReviews() {
    this.db.collection('reviews').get().then(res => {
      res.forEach(doc => {
        this.userReviews.push(doc.data());
      })
    }).catch(err => {

    })
  }
  getBooking(){
    let data = {
      school: {
        allday: null,
        cellnumber: '',
        closed: null,
        coords: {},
        cost: 0,
        desc: null,
        email: null,
        image: null,
        open: null,
        registration: null,
        schoolname: null,
        uid: null,
      },
      request: {
        book: null,
        confirmed: null,
        location: {},
        package: {},
        datecreated: null,
        datein: null,
        dateout: null,
        schooluid: null,
        uid: null,
        docid: null
      }
    }
    const loader = this.loadingCtrl.create({
      content: 'Please Wait'
    })
    loader.present()
    this.db.collection('bookings').where('uid', '==', this.user.uid).onSnapshot(res => {
      res.forEach(doc => {
        data.request.docid = doc.id;
        // this is extreme bad programming :(
        data.request.book = doc.data().book;
        data.request.confirmed = doc.data().confirmed
        data.request.location= doc.data().location
        data.request.package = doc.data().package
        data.request.datecreated= doc.data().datecreated
        data.request.datein= doc.data().datein
        data.request.dateout= doc.data().dateout
        data.request.schooluid= doc.data().schooluid
        data.request.uid= doc.data().uid
        this.db.collection('drivingschools').where('schooluid', '==', data.request.schooluid).onSnapshot(res => {
          res.forEach(doc => {
            data.school.allday = doc.data().allday;
            data.school.cellnumber = doc.data().cellnumber;
            data.school.closed = doc.data().closed;
            data.school.coords = doc.data().coords;
            data.school.cost = doc.data().cost;
            data.school.desc = doc.data().desc;
            data.school.email = doc.data().email;
            data.school.image = doc.data().image;
            data.school.open = doc.data().open;
            data.school.registration = doc.data().registration;
            data.school.schoolname = doc.data().schoolname;
            data.school.uid = doc.data().uid;
          })

        })
        this.request = []
        this.request.push(data);
        // this.more = this.request.indexOf()
        this.count += 1;
      })
      loader.dismiss()
      console.log('Reqs: ', this.request);
    })
  }
  showMore(index) {
    this.more.cond = !this.more
    this.more.id = index;
  }
  delete(docid) {
    const alerter = this.alertCtrl.create({
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this request',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.db.collection('bookings').doc(docid).delete().then(res => {
              this.request = [];
              this.getBooking()
              this.toastCtrl.create({
                message: 'Request deletes successfully',
                duration: 2000
              }).present()
            })
          }
        }
      ]
    })
    alerter.present()
  }
}
