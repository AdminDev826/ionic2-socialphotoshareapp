import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Parse} from 'parse';
import { HomePage } from "../home/home";

/**
 * Generated class for the Termsofuse page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-termsofuse',
  templateUrl: 'termsofuse.html',
})
export class Termsofuse {

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
    Parse.initialize("G9watfzx5oPJPdhlfDtW6wNXrEY7syqZYQnmW0nO", "GlKvpo90mEnPJCvlnvYPbnEApCUHPWS4TFkYxr7y");
    Parse.serverURL = "https://parseapi.back4app.com";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Termsofuse');
  }
  
  loginAsGuest(){
    this.events.publish('login:guest', true);
    this.navCtrl.setRoot(HomePage);
  };

}
