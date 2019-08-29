import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-you',
  templateUrl: 'you.html',
})
export class YouPage {
  @ViewChild('image') image: ElementRef;
  user = {
    name: '',
    surname: '',
    number: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private keyBoard: Keyboard, private renderer: Renderer2) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YouPage');
  }
  checkeyboard() {
    if (this.keyBoard.isOpen()) {
      this.renderer.setStyle(this.image.nativeElement, 'opacity', '0')
    } else {
      this.renderer.setStyle(this.image.nativeElement, 'opacity', '1')
    }
  }
}
