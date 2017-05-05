import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VenueDetail } from "../venue-detail/venue-detail";
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


/**
 * Generated class for the EventDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetail {
  event: any;
  myLocation = {lat:1, long:1};
  options = "location: 'yes', clearcache: 'yes', toolbar: 'yes'";
  
  constructor(public navCtrl: NavController, private iab: InAppBrowser, public geolocation: Geolocation, public navParams: NavParams) {

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
    dist = (dist * 100) / 100;
  	return dist
  }

  
  getDistance(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    this.geolocation.getCurrentPosition(posOptions).then(function (position) {
        this.myLocation.lat  = position.coords.latitude;
        this.myLocation.long = position.coords.longitude;

        var dist = this.distance(this.myLocation.lat, this.myLocation.long, this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude);
        this.event.venue.dist = dist;
      }, function(err) {
        // error
      });
  }
  

  goVenueDetail(){
    this.navCtrl.push(VenueDetail, {selectedEvent:this.event});
  }

  
  openWebsite(url){
    this.iab.create(url, '_blank', this.options).show();
    // .then(function(event) {
    //     // success
    //   })
    //   .catch(function(event) {
    //     // error
    //   });
  };

  navigatorApp(){
    var destination = [this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude];
  	var start = [this.myLocation.lat, this.myLocation.long];
    // var options = {app:launchnavigator.APP.UBER};
    // $cordovaLaunchNavigator.navigate(destination, start,  options).then(function() {
    //   console.log("Navigator launched");
    // }, function (err) {
    //   console.error(err);
    // });
  };

  goMapBrowser(){
    var url = "https://www.google.com/maps/search/" + this.event.venue.address[0]+","+this.event.venue.address[1];
    console.log(url);
    this.iab.create(url, '_system', this.options).show();
  };

}
