import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import { ProfilePage } from '../profile/profile';
import * as firebase from 'firebase';

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
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private element: ElementRef, private renderer: Renderer2, private platform: Platform) { }

  ionViewDidLoad(){
    this.loadMap();
    this.getusers();
  }
  swipeUp() {
    this.display = !this.display;
  }
  async loadMap(){
    let location;
    var ref = this;
    // let watch = this.geolocation.watchPosition();
    await this.geolocation.getCurrentPosition().then((resp) => {


      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      let data = {
        coords: {
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        },
        content: 'You'
      }
      console.log('Phone Location ', data);
      this.addMarker(data);
    }).catch((err) => {
      this.mapCenter.lat = -29.465306;
      this.mapCenter.lng = 24.741967;
      console.log('Geo Error: ', err);
    })

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
    // add marker
    const marker = new google.maps.Marker({
      position: props.coords,
      map: this.map,
    })
    // check for custom icon
    if(props.iconImage) {
      // set custom icon
      marker.setIcon(props.iconImage)
    }

    // check for content
    if(props.content) {
      // set custom content
     let infoWindow = new google.maps.InfoWindow({
       content: `<h5 style="margin:0;padding:0;">${props.name} </h5>`+props.content
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
    this.db.collection('users').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
      })
      console.log('Users: ', this.users);

    })
  }
}
