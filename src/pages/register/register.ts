import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';
import { Users } from '../../app/user';
import * as firebase from 'firebase';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user =  {} as Users;

  loginForm: FormGroup;
  
  
    email: string;
    password: string;
    RepeatedPassword: string;
    value: boolean = false;

  
  validation_messages = {

    'email': [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Email address is not Valid.'},
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


  constructor(public navCtrl: NavController, public forms: FormBuilder, public navParams: NavParams,  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.loginForm = this.forms.group({

      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),

      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),

      RepeatedPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  goToLanding(){
    console.log(this.loginForm.valid);
    
    if(this.password != this.RepeatedPassword){
      this.value = true;  
    }else if(this.loginForm.valid){
      this.navCtrl.setRoot(HomePage);
    }
   
  }
  createRegister(user: Users) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000
    })
    loading.present();
    let alertSuccess = this.alertCtrl.create({
        title: 'Registration',
        subTitle: 'you have been Successfully Registered. you can Login.',
        buttons: ['Ok']
    })
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((result) => {
      alertSuccess.present();
      this.navCtrl.push(LoginPage);
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      // Handle Errors here.
      let alert = this.alertCtrl.create({
        title: errorCode,
        subTitle: errorMessage,
        buttons: ['Try Again'],
    })
    alert.present();
    });
 this.navCtrl.push(LoginPage);
  }
}
