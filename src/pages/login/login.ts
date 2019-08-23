import { Component } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Users } from '../../app/user';
import * as firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user =  {} as Users;
  loginForm: FormGroup;
  
  
  email: string;
  password: string;
  validation_messages = {
    
    'email': [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Email address is not valid.'},
      {type: 'validEmail', message: 'Email address already exists in the system.'},
    ],


    'password': [
     {type: 'required', message: 'Password is required.'},
     {type: 'minlength', message: 'password must be more than 6 characters.'},
     {type: 'maxlength', message: 'Password must be less than 10 characters.'},
   ],



   'RepeatedPassword': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be more than 6 characters.'},
     {type: 'maxlength', message: 'Password must be less than 10 characters.'},
  ]
 
  }


  constructor(public navCtrl: NavController, public forms: FormBuilder, public navParams: NavParams, public loadingCtrl: LoadingController,   public alertCtrl: AlertController) {

    this.loginForm = this.forms.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),

      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Reg(){
   this.navCtrl.push(RegisterPage);
  }

  Home(){
    console.log("Button clicked");
    console.log(this.loginForm.valid);
    
    
    if(this.loginForm.valid){
      this.navCtrl.push(HomePage)
    }
  }
  login(user: Users) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000
    })
  
    loading.present();
  
  let alertSuccess = this.alertCtrl.create({
   title: 'Login',
   subTitle: 'You have Successfully LoggedIn',
   buttons: ['Ok']
  })
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((result) => {
        alertSuccess.present();
        this.navCtrl.setRoot(HomePage);
    }).catch((error) => {  
      let errorCode = error.code;
      let errorMessage = error.message;
     
      this.alertCtrl.create({
        title: errorCode,
        subTitle: errorMessage,
        buttons: ['Ok']
      }).present();
    });
  
  }
}
