import { Component, trigger, transition, style, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController, ViewController,Events } from 'ionic-angular';
import {Parse} from 'parse';
import { Forgotpassword } from "../forgotpassword/forgotpassword";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Termsofuse } from "../termsofuse/termsofuse";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";



/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  show:boolean = false;
  loginAsGuest = false;
  loading: any;
  user = {username:"", password:""};
  newuser={firstName:"", lastName:"", email:"", password:"", confirm:"", dob:"", gender:"", facebookLogin:false, profileImage:""}
  isTab = 'signin';


  constructor(
    private toastCtrl: ToastController, 
    private camera: Camera, 
    private loadingCtrl: LoadingController, 
    private actionsheetCtrl: ActionSheetController, 
    public nav: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private fb: Facebook,
    public events: Events
    ) {
    Parse.initialize("G9watfzx5oPJPdhlfDtW6wNXrEY7syqZYQnmW0nO", "GlKvpo90mEnPJCvlnvYPbnEApCUHPWS4TFkYxr7y");
    Parse.serverURL = "https://parseapi.back4app.com";

    this.isTab = navParams.get("isTab");
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  changeTab(tabName){
    this.isTab = tabName;
  }

  onSwipeLeft(){
    this.isTab = 'signin';
  }

  onSwipeRight(){
    this.isTab = 'signup';
  }
  swipeEvent($e) {
    var what = '';
    switch ($e.direction) {
      case 2:
        this.isTab = 'signin';
        break;
      case 4:
        this.isTab = 'signup';
        break;
      default:
        what = 'Swiped ???';
        break;
    }
  }
  goGuest(){
      // this.nav.push(Termsofuse);
      this.viewCtrl.dismiss("Termsofuse");
  }
  onForgotPassword(){
    // this.nav.push(Forgotpassword);
    this.viewCtrl.dismiss("Forgotpassword");
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast"
    });
    toast.present();
  }

  login(user){
      if(this.user.username == undefined || this.user.password == undefined || this.user.username == "" || this.user.password == "")
      {
        this.showToast('Please fill out email and password fields.');
        return;
      }

      this.showLoading();
      let _this = this;
      Parse.User.logIn(this.user.username, this.user.password, {
        success: function(user) {
          let username = user.get('firstName') + " " + user.get('lastName');
          let profileImage = user.get('profileImage');
          _this.loading.dismiss();
          _this.events.publish('user:created', username, profileImage);
          _this.viewCtrl.dismiss("login");
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          console.log(error);
          _this.loading.dismiss();
          _this.showToast(error.message);
          this.user = {username:"", password:""};
        }
      });
    }
    closeLogin(flag) {
      this.viewCtrl.dismiss();
    }

    showCameraSheet() {
      let _this = this;
      let actionsheet = this.actionsheetCtrl.create({
        title: 'Select your photo',
        buttons: [
          {
            text: 'From Camera',
            handler: () => {
              var options = {
                quality:50,
                targetWidth:300,
                targetHeight:300,
                destinationType: _this.camera.DestinationType.DATA_URL,
                sourceType: _this.camera.PictureSourceType.CAMERA,
              };
              _this.loading.present();
              _this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                // var parseFile = new Parse.File("mypic.jpg", base64Image);
                var parseFile = new Parse.File("mypic.jpg", {base64:imageData});
                parseFile.save().then(function(ob) {
                    try{
                      _this.newuser.profileImage = JSON.stringify(ob).split(",")[2].split("\":")[1].replace("}", "").replace("\"", "").replace("\"", "");
                    }catch(e){
                      console.log(e);
                    }
                    _this.loading.dismiss();
                }, function(error) {
                    console.log(error);
                    _this.loading.dismiss();
                });
              }, (err) => {
                _this.loading.dismiss();
                console.log(err);
              });
            }
          },
          {
            text: 'From PhotoLibrary',
            handler: () => {
              var options = {
                quality:50,
                targetWidth:300,
                targetHeight:300,
                destinationType: _this.camera.DestinationType.DATA_URL,
                sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
              };

              _this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                // var parseFile = new Parse.File("mypic.jpg", base64Image);
                var parseFile = new Parse.File("mypic.jpg", {base64:imageData});
                parseFile.save().then(function(ob) {
                    try{
                      _this.newuser.profileImage = JSON.stringify(ob).split(",")[2].split("\":")[1].replace("}", "").replace("\"", "").replace("\"", "");
                    }catch(e){
                      console.log(e);
                    }
                    _this.loading.dismiss();
                }, function(error) {
                    console.log(error);
                    _this.loading.dismiss();
                });
              }, (err) => {
                _this.loading.dismiss();
                console.log(err);
              });
            }
          }
        ]
      });
      actionsheet.present();
    }

    looksLikeMail(str) {
      var lastAtPos = str.lastIndexOf('@');
      var lastDotPos = str.lastIndexOf('.');
      return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
    }

    signup(){
      // let now = new Date();
      // this.newuser.dob = now.toISOString();
      let ddate = new Date(this.newuser.dob);
      console.log(ddate);
      if(this.newuser.firstName == undefined || this.newuser.firstName == "")
      {
        this.showToast('Please enter first name.');
        return;
      }

      if(this.newuser.lastName == undefined || this.newuser.lastName == "")
      {
        this.showToast('Please enter last name.');
        return;
      }

      if(this.newuser.email == undefined || this.newuser.email == "" || !this.looksLikeMail(this.newuser.email))
      {
        this.showToast('Please enter valid email address.');
        return;
      }

      if(this.newuser.password == undefined || this.newuser.password == "")
      {
        this.showToast('Please enter password.');
        return;
      }

      if(this.newuser.confirm == undefined || this.newuser.confirm == "")
      {
        this.showToast('Please enter confirm password.');
        return;
      }

      if(this.newuser.password !== this.newuser.confirm)
      {
        this.showToast('Password does not match.');
        return;
      }

      if(this.newuser.dob == undefined || this.newuser.dob == null)
      {
        this.showToast('Please enter birthday.');
        return;
      }

      if(this.newuser.gender == undefined || this.newuser.gender == "")
      {
        this.showToast('Please select gender.');
        return;
      }

      if(this.newuser.profileImage == undefined || this.newuser.profileImage == "")
      {
        this.showToast('Please select your photo.');
        return;
      }

      this.loading.present();
      let _this = this;
      
      var user = new Parse.User();
      user.set("username", this.newuser.email);
      user.set("password", this.newuser.password);
      user.set("email", this.newuser.email);
      user.set("firstName", this.newuser.firstName);
      user.set("lastName", this.newuser.lastName);
      user.set("dob", ddate);
      user.set("gender", this.newuser.gender);
      user.set("profileImage", this.newuser.profileImage);
      user.set("facebookLogin", this.newuser.facebookLogin);
      user.set("pushNotification", true);
      user.set("Venues", []);
      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          console.log(user);
          //$ionicLoading.hide();
          //ionicToast.show("Please verify your email before Login.", 'bottom',false, 3000);
          //$state.go("signin");
          let username = user.get('firstName') + " " + user.get('lastName');
          let profileImage = user.get('profileImage');
          _this.events.publish('user:created', username, profileImage);
          _this.loading.dismiss();
          _this.viewCtrl.dismiss("login");
          
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          console.log("Error: " + error.code + " " + error.message);
          _this.showToast(error.message);
          _this.loading.dismiss();
        }
      });
    }
    fbLogin(){
    var _this = this;
    this.fb.login(['public_profile'])
    .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array();

        //Getting name and gender properties
        _this.fb.api("/me?fields=first_name,last_name,email,gender,id,picture", ['public_profile'])
        .then(function(response) {
          console.log(response);
          _this.loading.present();
          var query = new Parse.Query(Parse.User);
          query.equalTo("username", response.id);
          query.equalTo("facebookLogin", true);
          query.find({
            success: function(aUser) {
              console.log(aUser);
              if(aUser.length > 0){
                Parse.User.logIn(response.id, response.id, {
                  success: function(user) {
                      console.log(user);
                      _this.loading.dismiss();
                      _this.viewCtrl.dismiss("login");
                  },
                  error: function(user, error) {
                    console.log(error);
                    _this.loading.dismiss();
                    _this.showToast(error.message);
                  }
                });
              }else{
                _this.loading.present();
                var user = new Parse.User();
                user.set("username", response.id);
                user.set("password", response.id);
                user.set("firstName", response.first_name);
                user.set("lastName", response.last_name);
                user.set("gender", response.gender);
                user.set("profileImage", response.picture.data.url);
                user.set("facebookLogin", true);
                user.set("pushNotification", false);
                user.set("Venues", []);
                user.signUp(null, {
                  success: function(user) {
                    console.log(user);
                    _this.loading.dismiss();
                    _this.viewCtrl.dismiss("login");
                  },
                  error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                    this.showToast(error.message);
                    _this.loading.dismiss();
                  }
                });
              }
            }
        });
      }, function(error){
        console.log(error);
      });
    });
  }
}
