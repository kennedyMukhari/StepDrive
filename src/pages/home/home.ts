import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, AlertController, App, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from "@ionic/storage";
import { CallNumber } from '@ionic-native/call-number';
import { SchoolsProvider } from "../../providers/schools/schools";
import {google} from 'google-maps'


import * as firebase from 'firebase';
import { ContactPage } from '../contact/contact';
import { Subject } from 'rxjs/Subject';
declare var google: google;
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
  markers = []
  geocoder = new google.maps.Geocoder;
  viewImage = {
    image: '',
    open: false
  }

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public store: Storage, public alertCtrl: AlertController,private callNumber: CallNumber, public appCtrl: App, public renderer: Renderer2, public plt: Platform, public elementref: ElementRef) { }

  ionViewDidLoad(){

    this.plt.ready().then(res => {
      console.log('Platform ready response', res);
      console.log('element reference ', this.elementref);
      let viewimage = this.elementref.nativeElement.children[0].children[1].children[0];
      this.renderer.setStyle(viewimage, 'transform', 'scale(0)');
    })
    firebase.auth().onAuthStateChanged(user => {
      this.user.uid = user.uid;
      // console.log('Logg', this.user);
    })
    this.getlocation();
    this.getusers();
  }
  openImage(image, cmd) {
    if (cmd == 'open') {
      this.viewImage.image = image;
      this.viewImage.open = true;
      let viewimage = this.elementref.nativeElement.children[0].children[1].children[0];
      this.renderer.setStyle(viewimage, 'opacity', '1');
      this.renderer.setStyle(viewimage, 'transform', 'scale(1)');
    } else {
      this.viewImage.open = false;
      let viewimage = this.elementref.nativeElement.children[0].children[1].children[0];
      this.renderer.setStyle(viewimage, 'opacity', '0');
      this.renderer.setStyle(viewimage, 'transform', 'scale(0)');
    }
  }
  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
}
  async onSearchChange(event) {
    let filterd = []
    if (event.target.value) {
  this.users.forEach(element => {
    let n:string = element.address.includes(event.target.value)
    if (n) {
      console.log('yes');
      filterd.push(element)
    } else {
      console.log('no');
    }
this.users = filterd

  });
    } else {
      this.getusers()
    }



  }
  viewSchool(data) {
    this.school = data;
    this.about = !this.about;
    let elements = document.querySelectorAll(".tabbar");
    if (this.about) {
      console.log('tabs should show');

      if (elements) {
        Object.keys(elements).map((key) => {
          elements[key].style.transform = 'translateY(0vh)';
          elements[key].style.transition = '0.4s';
        });
      }
    } else {
      if (elements) {
        console.log('tabs should hide');
        Object.keys(elements).map((key) => {
          elements[key].style.transform = 'translateY(50vh)';
          elements[key].style.transition = '0.4s';
        });
      }
    }
  }
  requestLesson(school, lessons, event) {
   let data = {
      school: school,
      lessons: lessons
    }
    console.log('event', event.path[0]);
    this.renderer.setStyle(event.path[0], 'transition', '0.4s');
    this.renderer.setStyle(event.path[0], 'transform', 'scale(1.07)');
    this.renderer.setStyle(event.path[0], 'background', 'url(../../assets/icon/package-background.svg),linear-gradient(45deg, rgba(255, 255, 255, 0.616),rgb(250, 182, 43)');
    setTimeout(()=>{
      this.renderer.setStyle(event.path[0], 'transform', 'scale(1)');
      this.renderer.setStyle(event.path[0], 'background', 'url(../../assets/icon/package-background.svg),linear-gradient(45deg, rgba(255, 255, 255, 0.616),rgb(250, 182, 43)');

      ///
      this.renderer.setStyle(event.path[0], 'background', 'url(../../assets/icon/package-background.svg),linear-gradient(45deg, rgba(255, 255, 255, 0.616),rgb(250, 182, 43)');

    }, 200);

    setTimeout(()=> {
this.appCtrl.getRootNav().push(ContactPage, data);
    }, 400)
    //
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

      this.loadMap(14);
      let radius = new google.maps.Circle({
        strokeColor: 'rgba(255, 154, 59, 0.589)',
        strokeOpacity: 0.01,
        strokeWeight: 2,
        fillColor: 'rgb(255, 148, 49)',
        fillOpacity: 0.01,
        map: this.map,
        center: data.schooladdress,
        radius: Math.sqrt(500) * 100
      });
      // this.initMap()
      const marker = new google.maps.Marker({
        position: data.schooladdress,
        map: this.map,
        icon: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/icons8-map-pin-64.png?alt=media&token=80953d82-f9c0-4b32-b8e9-dc83f9286f8b'
      })
      let infoWindow = new google.maps.InfoWindow({
        content: `<h5 style="margin:0;padding:0;">${data.schoolname} </h5>`+data.address
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
       })
      // this.addMarker(data);


    }).catch((err) => {
      console.log('Geo err', err);

      this.mapCenter.lat = -29.465306;
      this.mapCenter.lng = 24.741967;

      console.log('Geo Error: ', err);
      // this.initMap()
      this.loadMap(2);
      setTimeout(()=> {

      })
    })
  }
  swipeUp() {
    this.display = !this.display;
  }

  async loadMap(zoomlevel: number){
    // console.log('Map Centerd', this.mapCenter);

    let location;
    var ref = this;
    let watch = this.geolocation.watchPosition();

    let mapOptions = {
      center: this.mapCenter,
      zoom: zoomlevel,
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
    console.log(props);

    // console.log('Marker triggerd', props);

    // add marker
    const marker = new google.maps.Marker({
      position: props.coords,
      map: this.map,
      icon: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/icons8-car-16.png?alt=media&token=3a913499-e6d2-4128-9b4e-4a4ae206e08d'
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
  async getusers(){
   await this.db.collection('drivingschools').onSnapshot(async snapshot => {
      this.users = [];
      snapshot.forEach( async doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
        this.markers = []
        this.markers.push(doc.data());
      })
     await this.markers.forEach( async element => {
        this.addMarker(element);
      // await this.geocoder.geocode({'location': this.mapCenter}, (results, status) => {
      //   if (status === 'OK') {
      //     if (results[0]) {
      //       for (let index = 0; index < results.length; index++) {
      //         const element = results[index];
      //         console.log('Results ', element.formatted_address);
      //       }
      //     } else {
      //       console.log('No results found');
      //     }
      //   } else {
      //     console.log('Geocoder failed due to: ' + status);
      //   }
      // });

      })

      // console.log('Users: ', this.users);

    })
  }
  clearMarker(event) {
    console.log(event.path[2]);
    // this.renderer.setStyle(event.path[2], 'background', '#FAB62B')
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
