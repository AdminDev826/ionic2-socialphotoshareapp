import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Parse} from 'parse';

/**
 * Generated class for the ChangePassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePassword {

  user = {current_psw:"", new_psw:""};
  currentUser: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.currentUser = Parse.User.current();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassword');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  goBack(){
    // $ionicHistory.goBack();
  }

  onSavePassword(){
    if(this.user.current_psw == undefined || this.user.current_psw == "")
    {
      this.showToast('Please enter current password.');
      return;
    }

    if(this.user.new_psw == undefined || this.user.new_psw == "")
    {
      this.showToast('Please enter cell phone number.');
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
}
