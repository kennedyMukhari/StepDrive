import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import * as firebase from 'firebase'
import { Question1Page } from '../question1/question1';
declare var google;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  request = {
    datein: null, // from form
    dateout: null, // from form
    book: false, // from form
    uid: null, // from auth state
    schooluid: '', // from params
    datecreated: null, // from js
    location: { // always filled, from google
      address: '',
      lng: null,
      lat: null
    },
    package: {
      name: '',
      number: '',
      amount: null
    }
  }
  addressokay = false;
  message = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }
  ionViewDidLoad(){
    console.log('Contact', this.navParams.data);

    const date = new Date();
    this.request.datecreated = date.toDateString();
    firebase.auth().onAuthStateChanged(res => {
      console.log('User', res);
      // set the user id
      this.request.uid = res.uid;
    })
    console.log('yeah', this.navParams.data.school.uid);
    // set the school uid
    this.request.schooluid = this.navParams.data.school.schooluid;
    // set the number of lessons
    this.request.package.number = this.navParams.data.lessons.number;
    // set the cost
    this.request.package.amount = this.navParams.data.lessons.amount ;
    this.request.package.name = this.navParams.data.lessons.name ;
  }

  async saveAddress() {
    console.log(this.request);

    const loader = await this.loadingCtrl.create({
      content: 'Just a sec...',
    })
    loader.present();
    // create the booking with an auto generated id
    this.db.collection('bookings').add(this.request).then(async res => {
      let address = {
        location: this.request.location
      }
      this.db.collection('users').doc(this.request.uid).set(address, {merge: true}).then(res => {
        loader.dismiss();
        this.navCtrl.push(Question1Page);
      }).catch( async err=> {
        const alerter = await this.alertCtrl.create({
          message: "Something went wrong. We couldn't save you address",
          buttons: [
            {text: 'Okay'}
          ]
        })
        alerter.present();
      })
    }).catch(async err => {
      loader.dismiss();
      const alerter = this.alertCtrl.create({
        message: 'Something went wrong. Please try again later.',
        buttons: [
          {text: 'Okay'}
        ]
      })
      alerter.present();
    })
  }
  async justRequest() {
    console.log(this.request);
    const loader = await this.loadingCtrl.create({
      content: 'Just a sec...',
    })
    loader.present();
    this.db.collection('bookings').add(this.request).then(async res => {
      loader.dismiss();
      this.navCtrl.push(Question1Page);
    }).catch(async err => {
      loader.dismiss();
      const alerter = this.alertCtrl.create({
        message: 'Something went wrong. Please try again later.',
        buttons: [
          {text: 'Okay'}
        ]
      })
      alerter.present();
    })
  }
  checkAddress(){
    console.log(this.request.location.address);
    let location = this.request.location.address;
    let address = this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyAT55USDnQ-tZLHJlzryDJbxseD8sLSdZE'
      }
    }).subscribe(res => {
        console.log('Address', res.json());
        if (res.json().status == 'OK') {
          this.message = "Address Okay"
          this.addressokay = true;
          this.request.location.address = res.json().results[0].formatted_address;
          this.request.location.lat = res.json().results[0].geometry.location.lat;
          this.request.location.lng = res.json().results[0].geometry.location.lng;
          console.log('Data: ', this.request);

        } else {
          this.message = "Address not found or Invalid."
        }
    }, err => {
      console.log(err);
      // this.message = "Address not found or Invalid."
    })
  }
  async createrequest() {
    const alerter = await this.alertCtrl.create({
      title: 'Just a moment',
      message: 'Would you like us to save this address for future use?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            // create the request and save the address in the profile
            this.saveAddress()
            // console.log('Okay');

          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // create the booking without savein the address in the profile
            this.justRequest()
            // console.log('Asswipe');

          }
        }
      ]
    })
    alerter.present();
  }
}
