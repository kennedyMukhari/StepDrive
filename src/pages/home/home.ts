import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from "@ionic/storage";
import { CallNumber } from '@ionic-native/call-number';

declare var google;

import * as firebase from 'firebase';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  display = false;
  @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('list') list: ElementRef;
  map: any;
 // restriction for the map
 users = [];
 user = {
   uid: ''
 }
 SOUTH_AFRICAN_BOUNDS = {
  north: -21.914461,
  south: -35.800139,
  west: 15.905430,
  east: 34.899504
}
height = 50;
mapCenter = {
  lng: 0,
  lat: 0
}
  about = true;
  school = {
    schoolname: '',
    desc: '',
    content: '',
    image: ''
  }
  noLessons = null;
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public store: Storage, public alertCtrl: AlertController,private callNumber: CallNumber) { }

  ionViewDidLoad(){
    firebase.auth().onAuthStateChanged(user => {
      this.user.uid = user.uid;
      // console.log('Logg', this.user);
    })
    this.getlocation();
    this.getusers();
  }
  viewSchool(data) {
    this.school = data;
    this.about = !this.about;
  }
  requestLesson(school, lessons) {
   let data = {
      school: school,
      lessons: lessons
    }
    console.log('Requesting', data);
    this.navCtrl.push(ContactPage, data);
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
      this.store.set('homelocation', data);

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
  swipeUp() {
    this.display = !this.display;
  }
  async loadMap(){
    console.log('Map Centerd', this.mapCenter);

    let location;
    var ref = this;
    let watch = this.geolocation.watchPosition();

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
  // add marker function
  addMarker(props) {
    // console.log('Marker triggerd', props);

    // add marker
    const marker = new google.maps.Marker({
      position: props.schooladdress,
      map: this.map,

    })
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
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  getusers(){
    this.db.collection('drivingschools').onSnapshot(snapshot => {
      this.users = [];
      snapshot.forEach(doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
      })
      // console.log('Users: ', this.users);

    })
  }
  makerequest(request) {

  }
  call(school) {

    this.alertCtrl.create({
      message: `Call ${school.schoolname}?`,
      buttons: [{
        text: 'Call',
        handler: ()=>{
          this.callNumber.callNumber(school.cellnumber, true).then(res => {
            console.log('launched dialer! ', res);
          }).catch(err => {
            console.log('Error launching', err);

          })
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    }).present();
  }
}
export interface QUESTIONS {
  id: string;
  question: string;
  image: string;
  suggestions:any [];
  options: [
    {option: string, correct: boolean},
    {option: string, correct: boolean},
    {option: string, correct: boolean}
  ]
}
