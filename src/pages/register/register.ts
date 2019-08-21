import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';
import { Users } from '../../app/user';

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


  constructor(public navCtrl: NavController, public forms: FormBuilder, public navParams: NavParams) {

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

}
