import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {Parse} from "parse";


/**
 * Generated class for the Forgotpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class Forgotpassword {

  user = {email:""};
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController

    ) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: ''
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgotpassword');
  }
  
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  looksLikeMail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  }

  send(){
    console.log(this.user.email);
    if(this.user.email == undefined || this.user.email == "" || !this.looksLikeMail(this.user.email))
    {
      this.showToast('Please enter valid email address.');
      return;
    }

    this.loading.present();
    Parse.User.requestPasswordReset(this.user.email, {
      success: function() {
        // Password reset request was sent successfully
        this.loading.dismiss();
        this.showToast("Email has been sent. Please check your inbox.");
        //$ionicHistory.goBack();
      },
      error: function(error) {
        // Show the error message somewhere
        //alert("Error: " + error.code + " " + error.message);
        this.loading.dismiss();
        this.showToast(error.message);
      }
    });
  };

}
