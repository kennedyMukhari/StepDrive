import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-you',
  templateUrl: 'you.html',
})
export class YouPage {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  user = {
    name: '',
    surname: '',
    phone: null,
    image: null,
    location: {},
    uid: null
  }
  current = {
    email: null,
    uid: null
  }
  note = {
    text: '',
    datecreated: null
  }
  notes = [];
  isprofile = false;
  keyOpen = false;
  profileForm:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private keyBoard: Keyboard, private renderer: Renderer2, private camera: Camera, public loadingCtrl: LoadingController, public forms: FormBuilder, public store: Storage, public toastCtrl: ToastController) {
    this.profileForm = this.forms.group({
      name: new FormControl(this.user.name, Validators.compose([Validators.required])),
      surname: new FormControl(this.user.surname, Validators.compose([Validators.required])),
      image: new FormControl(this.user.image, Validators.compose([Validators.required])),
      phone: new FormControl(this.user.phone, Validators.compose([Validators.required])),
    })
  }

  ionViewDidLoad() {

    firebase.auth().onAuthStateChanged(res => {
      this.user.uid = res.uid
    })
    console.log('Current user ', this.user);

    this.store.get('homelocation').then(res => {
      this.user.location = res;
    })
    this.getprofile();
    this.getnote();
  }
  checkkeyboard() {
    console.log('Key');

    if (this.keyBoard.isOpen()) {
      this.keyOpen = true;
    } else {
      this.keyOpen = false;
    }
  }
  getImage() {
    console.log('Opem image');

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    this.camera.getPicture(options).then(imagedata => {

      let base64Image = `data:image/jpeg;base64,${imagedata}` ;
      console.log(base64Image);
      let uploadTask = this.storage.child(this.user.name).putString(base64Image, 'data_url');
      uploadTask.on('state_changed', snapshot => {
        let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
            case firebase.storage.TaskState.SUCCESS: // or 'running'
            console.log('Upload is done');
            break;
            case firebase.storage.TaskState.ERROR: // or 'running'
            console.log('An error occured');
            break;
        }
      }, err => {
        switch (err.name) {
          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");

            break;

          case 'storage/canceled':
            console.log('User canceled the upload');

            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downUrl => {
          this.user.image = downUrl
          console.log(this.user);

        })
      })
    })
  }
  createnote() {
    let date = new Date();
    this.note.datecreated = date.toDateString();
    this.db.collection('users').doc(this.user.uid).collection('notes').add(this.note).then(res => {
      this.getnote();

      this.toastCtrl.create({
        message: 'Note saved',
        duration: 2000
      }).present();
      this.note.text = '';
      this.note.datecreated = ''
    }).catch(err => {
      this.store.set('note', this.note);
      this.getnote()
      this.toastCtrl.create({
        message: 'Saved',
        duration: 2000
      }).present();
    })
  }
  getnote(){
    this.notes = [];
    firebase.auth().onAuthStateChanged(user => {
      this.db.collection('users').doc(user.uid).collection('notes').get().then(res => {
        if (!res.empty) {
          res.forEach(doc => {
            this.notes.push(doc.data());
          })
        }
      })
    })
  }
  getprofile() {
    firebase.auth().onAuthStateChanged(user => {
      this.user.uid = user.uid
      this.db.collection('users').doc(user.uid).get().then(res => {


        if (res.exists) {
          this.user.image = res.data().image
        this.user.location = res.data().location
        this.user.name = res.data().name
        this.user.phone = res.data().phone
        this.user.surname = res.data().surname
        this.user.uid = res.data().uid
        this.editprof();
        loader.dismiss();
        console.log('Got Profile: ', this.user);
        }
      })
    })
    const loader = this.loadingCtrl.create({
      content: 'Just a sec...',
    })
    loader.present()

  }
  createUser() {
    console.log(this.user);

    const loader = this.loadingCtrl.create({
      content: 'Just a sec...',
    })
    loader.present();
    firebase.auth().onAuthStateChanged(user => {
      this.user.uid = user.uid
      this.db.collection('users').doc(this.user.uid).set(this.user).then(res => {
      console.log('Profile Created');
      this.getprofile();
      loader.dismiss()
    }).catch(err => {
      console.log('Profile Creation error');
      loader.dismiss()
    })
    })
  }
  editprof() {
    this.isprofile = !this.isprofile;
  }
  removeimage(){
    this.user.image = null
  }
}
