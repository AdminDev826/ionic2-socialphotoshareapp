import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {Parse} from 'parse';
import { First } from '../first/first';
import * as moment from "moment";
import { Services } from "../../providers/services";
import { EmailComposer } from '@ionic-native/email-composer';
import { ChangePassword } from "../change-password/change-password";
import { Forgotpassword } from "../forgotpassword/forgotpassword";
import { About } from "../about/about";
import { Terms } from "../terms/terms";
import { Privacy } from "../privacy/privacy";

declare var parsePlugin;

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  loading: any;
  shownName = false;
  shownPassword = false;

  currentUser = {
    firstName:"", 
    lastName:"", 
    profileImage:"", 
    password:"", 
    email:"", 
    timeout:"", 
    pushNotification:""
  };
  user = {current_psw:"", new_psw:""};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private services: Services,
    private emailComposer: EmailComposer
    ) {
      var currentUser = Parse.User.current();
      if (currentUser) {
          this.currentUser.firstName = currentUser.get('firstName');
          this.currentUser.lastName = currentUser.get('lastName');
          this.currentUser.profileImage = currentUser.get('profileImage');
          this.currentUser.email = currentUser.get('email');
          this.currentUser.pushNotification = currentUser.get('pushNotification');
      } else {
          this.navCtrl.setRoot(First);
      }
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ''
    });
    this.loading.present();
  }

  showNameView(){
    if(this.shownName)
      this.shownName = false;
    else
      this.shownName = true;
  }
  showPasswordView(){
    if(this.shownPassword)
      this.shownPassword = false;
    else
      this.shownPassword = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
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

  onSavePassword(){
    if(this.user.current_psw == undefined || this.user.current_psw == "")
    {
      this.showToast('Please enter current password.');
      return;
    }

    if(this.user.new_psw == undefined || this.user.new_psw == "")
    {
      this.showToast('Please enter new password.');
      return;
    }
    let _this = this;

    var currentUser = Parse.User.current();
    if(currentUser){
        // $ionicLoading.show();
        Parse.User.logIn(currentUser.get('username'), _this.user.current_psw, {
          success: function(userAgain) {
            // Do stuff after successful login.
            //console.log(userAgain);
            userAgain.set("password", _this.user.new_psw);
              userAgain.save(null, {
                success:function(userAgagin1){
                  // $ionicLoading.hide();
                  _this.showToast("Password has been changed successfully.");
                  // $ionicHistory.goBack();
                },
                error: function(userAgain1, error) {
                  _this.showToast("Please enter exact current password.");
                  // This will error, since the Parse.User is not authenticated
                  console.log(userAgain1);
                  // $ionicLoading.hide();
                }
            });

          },
          error: function(user, error) {
            // The login failed. Check error to see why.
            console.log(error);
            // $ionicLoading.hide();
            _this.showToast("Please enter exact current password.");

          }
        });
    }
  }

  onSave(){
    if(this.currentUser.profileImage == undefined || this.currentUser.profileImage == "")
    {
      this.showToast('Please select photo image.');
      return;
    }

    if(this.currentUser.firstName == undefined || this.currentUser.firstName == "")
    {
      this.showToast('Please enter first name.');
      return;
    }

    if(this.currentUser.lastName == undefined || this.currentUser.lastName == "")
    {
      this.showToast('Please enter last name.');
      return;
    }


    this.showLoading();
    var currentUser = Parse.User.current();
    var query = new Parse.Query(Parse.User);
    query.get(currentUser.id, {
      success: function(userAgain) {
        this.loading.dismiss();
        console.log(userAgain);
        userAgain.set("firstName", this.currentUser.firstName);
        userAgain.set("lastName", this.currentUser.lastName);
        userAgain.set("email", this.currentUser.email);
        userAgain.set("profileImage", this.currentUser.profileImage);
        userAgain.set("pushNotification", this.currentUser.pushNotification);
        userAgain.save(null, {
          success:function(useragainAgain){
            // $rootScope.$broadcast('refreshUserInfo'); ---------------
            this.showToast("User information has been changed successfully.", 'bottom',false, 3000);
          },
          error: function(userAgain, error) {
            console.log(error);
          }
        });
      }
    });
  }

  changePush(){
    console.log(this.currentUser.pushNotification);
    let _this = this;
    if(this.currentUser.pushNotification){
      this.showLoading();
      parsePlugin.subscribe('SampleChannel', function() {
          console.log('OK');
          _this.loading.dismiss();
      }, function(e) {
          console.log('error');
          _this.loading.dismissAll();
      });
    }else{
      this.showLoading();
      let id = this.services.installationID;
      Parse.Cloud.run("removeInstallation", {installationId:id}, {
        success:function(result){
          console.log(result);
          _this.loading.dismissAll();
        },
        error:function(error){
          console.log(error);
          _this.loading.dismissAll();
        }
      });
      //-------------------
      // parsePlugin.unsubscribe('SampleChannel', function(msg) {
      //   _this.loading.dismissAll();
      //   console.log(msg)
      // }, function(e) {
      //   _this.loading.dismissAll();
      //   console.log(e);
      // });
    }
  }
  gotoChangePasswordPage(){
    this.navCtrl.push(ChangePassword);
  }
  gotoForgotPasswordPage(){
    this.navCtrl.push(Forgotpassword);
  }
  gotoTermsPage(){
    this.navCtrl.push(Terms);
  }
  gotoPrivacyPage(){
    this.navCtrl.push(Privacy);
  }
  gotoAboutPage(){
    this.navCtrl.push(About);
  }

  onContact(){
    var email = {
      to: 'rodk.music@gmail.com',
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Wugi App',
      body: '',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
