import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Gallery } from "../gallery/gallery";
import * as moment from "moment";

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
  myLocation = {lat:1, long:1};
  options = "location: 'yes', clearcache: 'yes', toolbar: 'yes'";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: Services,
    private iab: InAppBrowser, 
    public geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: ''
      });
      this.event = navParams.get("selectedEvent");
      console.log(this.event);
      this.loadVenuePhotoData();
      this.getDistance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenueDetail');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  loadVenuePhotoData(){
    if(this.event.venue){
      this.event.venue.photos = new Array();
      this.loading.present();
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
        }else{
          this.showToast(data.message);
        }
      });
    }else{
      this.event.venue = {
        type: "",
        neighborhood: "",
        photos: [],
        address:["",""],
        dist:"",
        phoneNumber:"",
        siteURL:"",
        parking:[]
      };
      this.showToast("Cannot find Venue !");
      this.navCtrl.popTo( this.navCtrl.getByIndex(1));
    }
  }
  
  goPhotoGallery(gallery){
    console.log(gallery);
    // $state.go("app.gallery", {selectedPhoto:angular.toJson(gallery)});
    this.navCtrl.push(Gallery, {selectedPhoto:gallery});
  };

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
  }

  navigatorApp(){
    var destination = [this.event.venue.geolocation.latitude, this.event.venue.geolocation.longitude];
  	var start = [this.myLocation.lat, this.myLocation.long];
    // var options = {app:launchnavigator.APP.UBER};
    // $cordovaLaunchNavigator.navigate(destination, start,  options).then(function() {
    //   console.log("Navigator launched");
    // }, function (err) {
    //   console.error(err);
    // });
  }

  goMapBrowser(){
    var url = "https://www.google.com/maps/search/" + this.event.venue.address[0]+","+this.event.venue.address[1];
    console.log(url);
    this.iab.create(url, '_system', this.options).show();
  }

}
