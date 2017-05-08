import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {Parse, parsePlugin} from 'parse';
import { First } from '../first/first';
import * as moment from "moment";
import { Services } from "../../providers/services";
import { EmailComposer } from '@ionic-native/email-composer';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  loading: any;
  currentUser = {
    firstName:"", 
    lastName:"", 
    profileImage:"", 
    password:"", 
    email:"", 
    timeout:"", 
    pushNotification:""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private services: Services,
    private emailComposer: EmailComposer
    ) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: ''
      });
      var currentUser = Parse.User.current();
      // this.currentUser = {firstName:"", lastName:"", profileImage:"", password:"", email:"", $timeout, pusNotification:""};
      if (currentUser) {
          this.currentUser.firstName = currentUser.get('firstName');
          this.currentUser.lastName = currentUser.get('lastName');
          this.currentUser.profileImage = currentUser.get('profileImage');
          this.currentUser.email = currentUser.get('email');
          this.currentUser.pushNotification = currentUser.get('pushNotification');
      } else {
          // this.navCtrl.setRoot(First);
      }
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


    this.loading.present();
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
    if(this.currentUser.pushNotification){
      this.loading.present();
      parsePlugin.subscribe('SampleChannel', function() {
          console.log('OK');
          this.loading.dismiss();
      }, function(e) {
          console.log('error');
          this.loading.dismiss();
      });
    }else{
      this.loading.present();
      // let id = $rootScope.installationId;------------
      let id = "";
      Parse.Cloud.run("removeInstallation", {installationId:id}, {
        success:function(result){
          console.log(result);
          this.loading.dismiss();
        },
        error:function(error){
          console.log(error);
          this.loading.dismiss();
        }
      });
    }
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
