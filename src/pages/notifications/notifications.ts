import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as moment from "moment";
import { Services } from "../../providers/services";
import { Gallery } from "../gallery/gallery";
import { EventDetail } from "../event-detail/event-detail";



@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class Notifications {

  notificationList = new Array();
  loading: any;

  constructor(
    public navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    private services: Services,
    public navParams: NavParams,
    private toastCtrl: ToastController
    ) {
      this.loadNotificationsData();
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ''
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  loadNotificationsData(){
    let _cthis = this;
    this.notificationList = new Array();
    this.showLoading();
    this.services.getNotificationAll().subscribe(data => {
      _cthis.loading.dismiss();
        if(_cthis.services.getStatus){
          for(var i in data){
            var notification = {
              title:data[i].get('title'),
              description:data[i].get('description'),
              gallery:data[i].get('gallery'),
              event:data[i].get('event'),
              images:data[i].get('images'),
              isWhat:"nothing",
              date:moment(data[i].get('createdAt')).fromNow()}

              if(notification.event && notification.event.id)
              {
                notification.isWhat = "event";
              }

              if(notification.gallery && notification.gallery.id)
                notification.isWhat = "gallery";

              console.log(notification);
              _cthis.notificationList.push(notification);
          }
        }else{
          _cthis.showToast(data.message);
        }
    });
  }

  goGallery(item){
    console.log(item.gallery);
    var event = {
      id:item.gallery.id,
      venueGallery:item.gallery.get('venueGallery'),
      active:item.gallery.get('active'),
      eventDate:moment(item.gallery.get('eventDate')).format("MMMM Do YYYY"),
      venueid:item.gallery.get('venueid'),
      ordering:item.gallery.get('ordering'),
      cover:item.gallery.get('cover'),
      title:item.gallery.get('title')
    };
    this.navCtrl.push(Gallery,{selectedPhoto: JSON.stringify(event)});
    // $state.go("app.gallery", {selectedPhoto:angular.toJson(event)});
  }

  goEvent(item){
    let _cthis = this;
    var selectedEvent = {};
    this.showLoading();
     this.services.getEventAll().subscribe(data=> {
      _cthis.loading.dismiss();
      if(_cthis.services.getStatus){
        var now = new Date();
        var today = moment(now).add(4, "hours").valueOf();
        for(var index in data){
          var event = {
            id:data[index].id,
            videoStillURL:data[index].get('videoStillURL'),
            dressCode:data[index].get('dressCode'),
            active:data[index].get('active'),
            dayOfWeek:data[index].get('dayOfWeek'),
            theme:data[index].get('theme'),
            endDate:data[index].get('endDate'),
            name:data[index].get('name'),
            venue:data[index].get('venue'),
            startDate:data[index].get('startDate'),
            desc:data[index].get('desc'),
            ordering:data[index].get('ordering'),
            imageURL:data[index].get('imageURL'),
            imageThumbURL:data[index].get('imageThumbURL'),
            imageFeatureURL:data[index].get('imageFeatureURL'),
            videoURL:data[index].get('videoURL'),
            feature:data[index].get('feature'),
            deleted:data[index].get('deleted'),
            age:data[index].get('age'),
            description:data[index].get('description'),
            timestamp:moment(data[index].get('startDate')).valueOf(),
            formatted_date:""
          };

          event.formatted_date = moment(event.startDate).format("MMMM Do YYYY HH:SS");

          if(event.id == item.event.id)
          {
            selectedEvent = event;
          }
        }
        // $state.go("app.event_detail", {selectedEvent:angular.toJson(selectedEvent)});
        _cthis.navCtrl.push(EventDetail, {selectedEvent: JSON.stringify(selectedEvent)});
      }else{
        _cthis.showToast(data.message);
      }
    });
  }
}
