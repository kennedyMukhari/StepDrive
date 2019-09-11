import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
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
  school = {}
  more = {
    cond: false,
    id: 0
  }
  showTips = false;
  count = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, private store: Storage, public plt: Platform, public localNot: LocalNotifications, public element: ElementRef, public renderer: Renderer2) {
  }
  // get the request of the user
  // get the schooldata where they made the request
  ionViewDidLoad() {
    this.plt.ready().then(ready=>{
      this.db.collection('bookings').where('uid', '==', this.user.uid).onSnapshot(res=> {
        this.count += 1;
        // if (this.count > 1) {
          this.pushNotification();
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
        } else {
          console.log('Got no data');

        }
      })
      this.getBooking()
    })
this.initialiseTips();
this.pushNotification();
  }
  reviews(event) {

    console.log(event.deltaY);

    let reviewDiv = this.element.nativeElement.children[0].children[1].children[1];
    this.renderer.setStyle(reviewDiv, 'top', `translateY(${event.deltaY})`);


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
        });

    }
    this.showTips = false;
  }
  pushNotification() {
    this.db.collection('bookings').where('uid', '==', this.user.uid).onSnapshot(res => {
      if (this.count > 1) {
        this.localNot.schedule({
          id: 1,
          title: 'StepDrive',
          text: 'One of the driving instructors responded to your request.'
        })
      }
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
    this.db.collection('bookings').where('uid', '==', this.user.uid).get().then(res => {
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
        this.db.collection('drivingschools').where('schooluid', '==', data.request.schooluid).get().then(res => {
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
        // this.request = []
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
