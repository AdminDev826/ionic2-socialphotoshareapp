import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { First } from "../pages/first/first";
import {Parse, parsePlugin} from 'parse';
import { Login } from "../pages/login/login";
import { Services } from "../providers/services";
import { Facebook } from "@ionic-native/facebook";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { About } from "../pages/about/about";
import { Browse } from "../pages/browse/browse";
import { BrowseCategory } from "../pages/browse-category/browse-category";
import { ChangePassword } from "../pages/change-password/change-password";
import { Contact } from "../pages/contact/contact";
import { EventDetail } from "../pages/event-detail/event-detail";
import { Forgotpassword } from "../pages/forgotpassword/forgotpassword";
import { Gallery } from "../pages/gallery/gallery";
import { Notifications } from "../pages/notifications/notifications";
import { Photos } from "../pages/photos/photos";
import { Privacy } from "../pages/privacy/privacy";
import { Search } from "../pages/search/search";
import { Settings } from "../pages/settings/settings";
import { Terms } from "../pages/terms/terms";
import { Terms1 } from "../pages/terms1/terms1";
import { Termsofuse } from "../pages/termsofuse/termsofuse";
import { Upcomming } from "../pages/upcomming/upcomming";
import { VenueDetail } from "../pages/venue-detail/venue-detail";
import { global } from "../providers/services";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = First;
  nativePages;
  private menu: MenuController;

  currentUser = {
    name: "",
    photo: ""
  }


  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    menu: MenuController,
    public toastCtrl: ToastController,
    private services: Services,
    public events: Events,
    private alertCtrl: AlertController
    ) {
      this.menu = menu;
      this.nativePages = [
        { title: 'HOME', component: HomePage, icon_name: 'home-outline' },
        { title: 'UPCOMING', component: Upcomming, icon_name: 'calendar-outline' },
        { title: 'PHOTOS', component: Photos, icon_name: 'camera-outline' },
        { title: 'BROWSE', component: Browse, icon_name: 'options-outline' },
        { title: 'NOTIFICATIONS', component: Notifications, icon_name: 'clipboard-outline' },
        { title: 'SETTINGS', component: Settings, icon_name: 'settings-outline' },
        { title: 'LOGOUT', component: null, icon_name: 'exit-outline' }
      ];

      this.events.subscribe('user:created', (name, photo) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.currentUser.name = name;
        this.currentUser.photo = photo;
      });

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
      

        Parse.initialize("G9watfzx5oPJPdhlfDtW6wNXrEY7syqZYQnmW0nO", "GlKvpo90mEnPJCvlnvYPbnEApCUHPWS4TFkYxr7y");
        Parse.serverURL = "https://parseapi.back4app.com";

        try{
          parsePlugin.register({
          appId:"G9watfzx5oPJPdhlfDtW6wNXrEY7syqZYQnmW0nO", clientKey:"DDpKun5fbQLzvuXdKwDtTnwgIQdln6BAV0m7qBxe", server:"https://parseapi.back4app.com", ecb:"onNotification", pushOpen: "onPushOpen" },
          function() {
              console.log('successfully registered device!');
              this.doWhatever();
          }, function(e) {
              console.log('error registering device: ' + e);
          });
        }catch(e){
          console.log(e);
        }

        statusBar.styleDefault();
        splashScreen.hide();
      });
  }

  doWhatever(){
    parsePlugin.getInstallationId(function(id) {
        console.log(id);
        this.services.installationID = id;
    }, function(e) {
        console.log('error');
    });

    parsePlugin.getSubscriptions(function(subscriptions) {
        console.log(subscriptions);
    }, function(e) {
        console.log('error');
    });
    /*
    parsePlugin.subscribe('SampleChannel', function() {
        console.log('OK');
    }, function(e) {
        console.log('error');
    });

    parsePlugin.unsubscribe('SampleChannel', function(msg) {
        console.log('OK');
    }, function(e) {
        console.log('error');
    });
    */
  } 

    onNotification(pnObj){
        //alert("received pn: " + JSON.stringify(pnObj));
        // navigator.notification.alert(angular.toJson(pnObj), function(index){}, "Wugi", "Ok");
        let alert = this.alertCtrl.create({
          title: 'Wugi',
          subTitle: JSON.stringify(pnObj),
          buttons: ['Ok']
        });
        alert.present();
    }

    onPushOpen(pnObj){
        //alert("open from pn: " + JSON.stringify(pnObj));
        // navigator.notification.alert(angular.toJson(pnObj), function(index){}, "Wugi", "Ok");
        let alert = this.alertCtrl.create({
          title: 'Wugi',
          subTitle: JSON.stringify(pnObj),
          buttons: ['Ok']
        });
        alert.present();
    }

  openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		let component = page.component;
    if(component == null){
      Parse.User.logOut();
      this.nav.setRoot(First);
    }else{
      this.nav.setRoot(component);
    }
  }
}

