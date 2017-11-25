import { Component } from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'ar.html'
})
export class ARPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
     }

     ionViewDidEnter() {
       console.log("ionViewDidEnter trackingPage.");
  }
}
