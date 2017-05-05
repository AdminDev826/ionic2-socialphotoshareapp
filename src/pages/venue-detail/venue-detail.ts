import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Services } from "../../providers/services";
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


/**
 * Generated class for the VenueDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-venue-detail',
  templateUrl: 'venue-detail.html',
})
export class VenueDetail {

  event: any;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: Services,
    private iab: InAppBrowser, 
    public geolocation: Geolocation,
    private loadingCtrl: LoadingController
    ) {
    this.event = navParams.get("selectedEvent");
    console.log(this.event);
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    this.loadVenuePhotoData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenueDetail');
  }

  loadVenuePhotoData(){
    this.event.venue.photos = new Array();
    this.loading.show();
    this.services.getGalleryAll().subscribe(data=>{
      this.loading.dismiss();
      if(this.services.getStatus){
        for(var index in data){

          var event = {
            id:data[index].id,
            venueGallery:data[index].get('venueGallery'),
            active:data[index].get('active'),
            eventDate:moment(data[index].get('eventDate')).format("MMMM Do YYYY"),
            venueid:data[index].get('venueid'),
            ordering:data[index].get('ordering'),
            cover:data[index].get('cover'),
            title:data[index].get('title')
          };
          if(event.venueid.id == this.event.venue.objectId)
            this.event.venue.photos.push(event);
        }
      }
    })
    ParseGalleryService.all().then(function (data) {
      this.loading.hide();

      for(var index in data){

        var event = {
          id:data[index].id,
          venueGallery:data[index].get('venueGallery'),
          active:data[index].get('active'),
          eventDate:moment(data[index].get('eventDate')).format("MMMM Do YYYY"),
          venueid:data[index].get('venueid'),
          ordering:data[index].get('ordering'),
          cover:data[index].get('cover'),
          title:data[index].get('title')
        };
        if(event.venueid.id == this.event.venue.objectId)
          this.event.venue.photos.push(event);
      }
    },
    function (error) {
      this.loading.hide();
      ionicToast.show(error.message, 'bottom',false, 3000);
    });
  }
  

  this.goPhotoGallery = function(gallery){
    console.log(gallery);
    $state.go("app.gallery", {selectedPhoto:angular.toJson(gallery)});
  };

  var distance = function(lat1, lon1, lat2, lon2, unit) {
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
    dist = parseInt(dist * 100) / 100;
  	return dist
  }

  this.myLocation = {lat:1, long:1};
  var getDistance = function(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        this.myLocation.lat  = position.coords.latitude;
        this.myLocation.long = position.coords.longitude;

        dist = distance(this.myLocation.lat, this.myLocation.long, this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude);
        this.event.venue.dist = dist;
      }, function(err) {
        // error
      });
  };
  getDistance();

  this.goVenueDetail = function(){
    $state.go("app.venue_detail", {selectedEvent:angular.toJson(this.event)})
  };

  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes'
  };
  this.openWebsite = function(url){
    $cordovaInAppBrowser.open(url, '_blank', options).then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
  };

  this.navigatorApp = function(){
    var destination = [this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude];
  	var start = [this.myLocation.lat, this.myLocation.long];
      var options = {app:launchnavigator.APP.UBER};
      $cordovaLaunchNavigator.navigate(destination, start,  options).then(function() {
        console.log("Navigator launched");
      }, function (err) {
        console.error(err);
      });
  };

  this.goMapBrowser = function(){
    var url = "https://www.google.com/maps/search/" + this.event.venue.address[0]+","+this.event.venue.address[1];
    console.log(url);
    $cordovaInAppBrowser.open(url, '_system', options).then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
  };

}
