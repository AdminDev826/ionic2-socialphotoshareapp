import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import { EventDetail } from "../event-detail/event-detail";
import * as moment from "moment";

/**
 * Generated class for the Upcomming page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upcomming',
  templateUrl: 'upcomming.html',
})
export class Upcomming {
  
  eventTileList: any;
  loading: any;
  calendar_list = new Array();
	activeDate: any;
  activeNextDate: any;
  activeDateIndex = 0;

  curEventList: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private services: Services, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
    this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: ''
      });
    this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upcomming===' + this.services.temp);
  }
  swipeEvent($e) {
    switch ($e.direction) {
      case 2:
        this.onSwipeLeft();
        break;
      case 4:
        this.onSwipeRight();
        break;
      default:
        break;
    }
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  initData(){
		var now = new Date();
		var today = moment(now).valueOf();

    this.activeDate = {timestamp:today, dayNum:"", dayOfWeek:""};
    this.activeDateIndex = 0;
    this.activeNextDate = {timestamp:(today)+24*60*60*1000, dayNum:"", dayOfWeek:""};
    this.calendar_list.push({timestamp:today, dayNum:"", dayOfWeek:""});
    for(var i=1; i<7; i++){
      var timestamp = (today) + i * 24 * 60 * 60 * 1000;
      this.calendar_list.push({timestamp:timestamp, dayNum:"", dayOfWeek:""})
    }

    for(var j=0; j<7; j++){
      this.calendar_list[j].dayNum = moment(this.calendar_list[j].timestamp).format("DD");
      this.calendar_list[j].dayOfWeek = moment(this.calendar_list[j].timestamp).format("dd");
    }

    console.log(this.calendar_list);
    this.loadEventsData();
	}

  loadEventsData(){
    this.eventTileList = new Array();
    this.loading.present();
    this.services.getEventAll().subscribe(data=> {
      this.loading.dismiss();
      if(this.services.getStatus){
        var firstFeatrue = [];
        var secondFeatrue = [];
        var zeroFeatrue = [];
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
          event.formatted_date = moment(event.startDate).format("MMMM Do YYYY");
          if(event.feature == 1 && ((event.timestamp >= parseInt(this.calendar_list[0].timestamp)) && (event.timestamp <= (parseInt(this.calendar_list[0].timestamp)+ 7* 24 * 60 * 60 * 1000)))){
            firstFeatrue.push(event);
            //this.eventTileList.push(event);
          }

          if(event.feature == 2 && ((event.timestamp >= parseInt(this.calendar_list[0].timestamp)) && (event.timestamp <= (parseInt(this.calendar_list[0].timestamp)+ 7* 24 * 60 * 60 * 1000)))){
            secondFeatrue.push(event);
          }

          if(event.feature == 0 && ((event.timestamp >= parseInt(this.calendar_list[0].timestamp)) && (event.timestamp <= (parseInt(this.calendar_list[0].timestamp)+ 7* 24 * 60 * 60 * 1000)))){
            zeroFeatrue.push(event);
          }
        }
        for(var index in secondFeatrue){
          this.eventTileList.push(secondFeatrue[index]);
        }

        for(var index in firstFeatrue){
          this.eventTileList.push(firstFeatrue[index]);
        }

        for(var index in zeroFeatrue){
          this.eventTileList.push(zeroFeatrue[index]);
        }
      }else{
        this.showToast(data.message);
      }
    });
  }

  changeDate(day){
    console.log(day);
    this.activeDate = day;
    this.activeNextDate = {timestamp:parseInt(day.timestamp)+24*60*60*1000, dayNum:"", dayOfWeek:""};
    
  }


  goDetail(item){
    this.navCtrl.push(EventDetail, {selectedEvent:JSON.stringify(item)});
  }

  onSwipeLeft = function(){
    console.log("onSwipeLeft");
    if(this.activeDateIndex>=0 && this.activeDateIndex<6)
    {
      this.activeDateIndex++;
      this.changeDate(this.calendar_list[this.activeDateIndex]);
    }
  }

  onSwipeRight = function(){
    console.log("onSwipeRight");
    if(this.activeDateIndex>0 && this.activeDateIndex<7)
    {
      this.activeDateIndex--;
      this.changeDate(this.calendar_list[this.activeDateIndex]);
    }
  }

}
