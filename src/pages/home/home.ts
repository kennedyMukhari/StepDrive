import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from "@ionic/storage";
import { CallNumber } from '@ionic-native/call-number';
import { SchoolsProvider } from "../../providers/schools/schools";
declare var google;

import * as firebase from 'firebase';
import { ContactPage } from '../contact/contact';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  display = false;
  @ViewChild('map') mapElement: ElementRef;

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
  placeSearch = ''
  startAt = new Subject();
  endAt = new Subject();
  searchres
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public store: Storage, public alertCtrl: AlertController,private callNumber: CallNumber, public appCtrl: App) { }

  ionViewDidLoad(){

    console.log('Native el', this.placeSearch);

    firebase.auth().onAuthStateChanged(user => {
      this.user.uid = user.uid;
      // console.log('Logg', this.user);
    })
    this.getlocation();
    this.getusers();
  }
  async onSearchChange(event) {
    let querytext = event.target.value.toLowerCase();
    let filterd = []
    let res = this.users.forEach(element => {
      element.includes(querytext);
    });
    console.log(res);

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
    this.appCtrl.getRootNav().setRoot(ContactPage, data);
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
      // this.initMap()
      this.addMarker(data);

    }).catch((err) => {
      console.log('Geo err', err);

      this.mapCenter.lat = -29.465306;
      this.mapCenter.lng = 24.741967;
      console.log('Geo Error: ', err);
      // this.initMap()
      this.loadMap();
    })
  }
  swipeUp() {
    this.display = !this.display;
  }
  initMap() {
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
    var map = new google.maps.Map(document.getElementById('map'), {
      center: this.mapCenter,
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Detaisls request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        marker.setPosition(place.geometry.location);
        map.fitBounds(place.geometry.viewport);
      } else {
        console.log('Set center');

        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

  }
  async loadMap(){
    // console.log('Map Centerd', this.mapCenter);

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
