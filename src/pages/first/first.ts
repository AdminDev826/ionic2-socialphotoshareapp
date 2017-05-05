import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Termsofuse } from "../termsofuse/termsofuse";
import { Terms1 } from "../terms1/terms1";
import { Login } from "../login/login";
import { HomePage } from "../home/home";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import {Parse} from 'parse';



@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class First {

  termsmodal: any;
  loading: any;

  constructor(public nav: NavController, private fb: Facebook, private loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, private modal: ModalController) {
    this.termsmodal = this.modal.create(Terms1);
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'please wait ...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad First');
    
  }

  goGuest(){
      this.nav.push(Termsofuse);
  }

  onTerms(){
      this.termsmodal.present();
  }

  showSignin() {   
    var mmodal = this.modal.create(Login, {isTab: "signin"});
    mmodal.onDidDismiss(item => {
      if (!item) {
        return;
      }
      this.nav.setRoot(HomePage);
    });
    mmodal.present();
  }

  showSignup() {   
    var mmodal = this.modal.create(Login, {isTab: "signup"});
    mmodal.onDidDismiss(item => {
      if (!item) {
        return;
      }
      this.nav.setRoot(HomePage);
    });
    mmodal.present();
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  fbLogin(){
    this.loading.present();
    var _this = this;

    // var fbLoginSuccess = function (userData) {
    //     console.log(userData);
    //     Facebook.api('/me?fields=first_name,last_name,email,gender,id,picture',["public_profile"],
    //         function(response) {
    //               console.log(response);
    //               // $ionicLoading.show({template:'Getting Parse User Information...'});

    //               var query = new Parse.Query(Parse.User);
    //               query.equalTo("username", response.id);
    //               query.equalTo("facebookLogin", true);
    //               query.find({
    //                 success: function(aUser) {
    //                   console.log(aUser);
    //                   if(aUser.length > 0){

    //                     Parse.User.logIn(response.id, response.id, {
    //                       success: function(user) {
    //                           console.log(user);
    //                           _this.loading.dismiss();
    //                           _this.nav.setRoot(HomePage);
    //                       },
    //                       error: function(user, error) {
    //                         console.log(error);
    //                         _this.loading.dismiss();
    //                         _this.showToast(error.message);
    //                       }
    //                     });
    //                   }else{
    //                     // $ionicLoading.show({template:'Sign up processing...'});
    //                     var user = new Parse.User();
    //                     user.set("username", response.id);
    //                     user.set("password", response.id);
    //                     user.set("firstName", response.first_name);
    //                     user.set("lastName", response.last_name);
    //                     user.set("gender", response.gender);
    //                     user.set("profileImage", response.picture.data.url);
    //                     user.set("facebookLogin", true);
    //                     user.set("pushNotification", false);
    //                     user.set("Venues", []);
    //                     user.signUp(null, {
    //                       success: function(user) {
    //                         console.log(user);
    //                         _this.loading.dismiss();
    //                         _this.nav.setRoot(HomePage);
    //                       },
    //                       error: function(user, error) {
    //                         console.log("Error: " + error.code + " " + error.message);
    //                           _this.loading.dismiss();
    //                         this.showToast(error.message);
    //                       }
    //                     });
    //                   }
    //                 },
    //                 error:function(user, error){
    //                   console.log(error);
    //                   _this.loading.dismiss();
    //                 }
    //               });
    //     });
    // }

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));

    // Facebook.login(["public_profile"], fbLoginSuccess,
    //       function loginError (error) {
    //           console.error(error);
    //           _this.loading.dismiss();
    //       }
    // );
    
  }

}
