import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VenueDetail } from "../venue-detail/venue-detail";
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';



@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetail {
  event: any;
  myLocation = {lat:1, long:1};
  options = "location: 'yes', clearcache: 'yes', toolbar: 'yes'";
  
  constructor(
    public navCtrl: NavController, 
    private iab: InAppBrowser, 
    public geolocation: Geolocation, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private launchNavigator: LaunchNavigator,
    private platform: Platform
    ) {

    this.event = JSON.parse(navParams.get("selectedEvent"));
    console.log(this.event);

    if(this.event && this.event.venue && this.event.venue.recentPhotos){
      this.event.venue.photos = new Array();
      for(var index in this.event.venue.recentPhotos){
        this.event.venue.photos.push({url:this.event.venue.recentPhotos[index]});
      }
    }
    this.getDistance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetail');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  distance(lat1, lon1, lat2, lon2, unit) {
  	var radlat1 = Math.PI * lat1/180;
  	var radlat2 = Math.PI * lat2/180;
  	var theta = lon1-lon2;
  	var radtheta = Math.PI * theta/180;
  	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist);
  	dist = dist * 180/Math.PI;
  	dist = dist * 60 * 1.1515;
  	if (unit=="K") { dist = dist * 1.609344 }
  	if (unit=="N") { dist = dist * 0.8684 }
    // dist = (dist * 100) / 100;
    let distt = dist.toFixed(2);
  	return distt
  }

  
  getDistance(){
    let _this = this;
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    this.geolocation.getCurrentPosition(posOptions).then(function (position) {
        _this.myLocation.lat  = position.coords.latitude;
        _this.myLocation.long = position.coords.longitude;

        var dist = _this.distance(_this.myLocation.lat, _this.myLocation.long, _this.event.venue.geolocation.latitude, _this.event.venue.geolocation.longitude, null);
        _this.event.venue.dist = dist;
      }, function(err) {
        // error
      });
  }
  

  goVenueDetail(){
    if(this.event.venue){
      this.navCtrl.push(VenueDetail, {selectedEvent:this.event});
    }else{
      this.showToast("Cannot find Venue !");
    }
  }

  
  openWebsite(url){
    this.iab.create(url, '_blank', this.options).show();
    // .then(function(event) {
    //     // success
    //   })
    //   .catch(function(event) {
    //     // error
    //   });
  }

  navigatorApp(){
    var destination = [this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude];
  	var start = [this.myLocation.lat, this.myLocation.long];
    // 1--------------
    // var options = {app:launchnavigator.APP.UBER};
    // $cordovaLaunchNavigator.navigate(destination, start,  options).then(function() {
    //   console.log("Navigator launched");
    // }, function (err) {
    //   console.error(err);
    // });-----
    
    let options: LaunchNavigatorOptions = {
      start: start
      // app: LaunchNavigator.APPS.UBER
    };
    this.launchNavigator.navigate(destination, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    
    // 3-----------
    // let destination1 = this.event.venue.geolocation.latitude + ',' + this.event.venue.geolocation.longitude;
    // if(this.platform.is('ios')){
    //   window.open('maps://?q=' + destination, '_system');
    // } else {
    //   let label = encodeURI('My Label');
    //   window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    // }
  }

  goMapBrowser(){
    var url = "https://www.google.com/maps/search/" + this.event.venue.address[0]+","+this.event.venue.address[1];
    console.log(url);
    this.iab.create(url, '_system', this.options).show();
  }

}
