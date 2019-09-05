import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import * as firebase from 'firebase'
import { Question1Page } from '../question1/question1';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
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

  SOUTH_AFRICAN_BOUNDS = {
    north: -21.914461,
    south: -35.800139,
    west: 15.905430,
    east: 34.899504
  }
  mapCenter = {
    lng: 0,
    lat: 0
  }
  constructor(public navCtrl: NavController,public geolocation: Geolocation, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }
  ionViewDidLoad(){
    this.getlocation()
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
  geocodePosition(pos){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode
     ({
         latLng: pos
     },
         function(results, status)
         {
             if (status == google.maps.GeocoderStatus.OK)
             {
               console.log(results[0].formatted_address);
             }
             else
             {
                 console.log(status);

             }
         }
     );
 }
  async getlocation() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Get loc res', resp);

      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      let data = {
        schooladdress: {
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        },
        schoolname: 'You',
        address: ' '
      }

      this.loadMap();
      this.addMarker(data);

    }).catch((err) => {
      console.log('Geo err', err);

      this.mapCenter.lat = -29.465306;
      this.mapCenter.lng = 24.741967;
      console.log('Geo Error: ', err);
      this.loadMap();
    })
  }
    // add marker function
    addMarker(props) {
      // console.log('Marker triggerd', props);

      // add marker
      const marker = new google.maps.Marker({
        position: props.schooladdress,
        map: this.map,
        draggable:true,
        animation: google.maps.Animation.DROP,

      })
      marker.addListener('drag', (event) =>
{
    console.log(event.getPosition());

});
      // check for custom icon
      if(props.iconImage) {
        // set custom icon
        marker.setIcon(props.iconImage)
      }

      // check for content
      if(props.address || props.schoolname) {
        // set custom content
       let infoWindow = new google.maps.InfoWindow({
         content: `<h5 style="margin:0;padding:0;">${props.schoolname} </h5>`+props.address
       });
       marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
       })
      }
    }

  async loadMap(){
    console.log('Map Centerd', this.mapCenter);

    let location;
    var ref = this;
    // let watch = this.geolocation.watchPosition();

    let mapOptions = {
      center: this.mapCenter,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: true
      }
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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
