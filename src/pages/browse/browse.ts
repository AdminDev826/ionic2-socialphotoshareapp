import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import * as moment from "moment";
import { BrowseCategory } from "../browse-category/browse-category";


@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class Browse {

  @ViewChild(Content) content: Content;

  currentTab = "event";
  // loading: any;
  browseEventList = new Array();
  browseVenueList = new Array();
  browseVenueTypeList = new Array();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private services: Services
    ) {
      // this.loading = this.loadingCtrl.create({
      //   spinner: 'dots',
      //   content: ''
      // });
      this.loadBrowseEventsData();
      this.loadBrowseVenueData();
      this.loadBrowseVenueTypeData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Browse');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  changeTab(name){
    if(this.currentTab == name){
      return;
    }
    this.currentTab = name;
  }

  onSwipeRight(){

    if(this.currentTab == 'venue'){
      this.currentTab = 'event';
      this.loadBrowseVenueData();
    }

    if(this.currentTab == 'type'){
      this.currentTab = 'venue';
      this.loadBrowseVenueTypeData();
    }
  }

  onSwipeLeft(){
    if(this.currentTab == 'venue'){
      this.currentTab = 'type';
      this.loadBrowseVenueData();
    }

    if(this.currentTab == 'event'){
      this.currentTab = 'venue';
      this.loadBrowseEventsData();
    }

  }

  
  loadBrowseEventsData(){
    this.browseEventList = new Array();
    // this.loading.present();
    this.services.getEventAll().subscribe(data=>{
        // this.loading.dismiss();
        if(this.services.getStatus){
          for(var index in data){
          var event = {
            id:data[index].id,
            browseEvent:data[index].get('browseEvent'),
            startDate:moment(data[index].get('startDate')).valueOf()
          };
          var now = new Date();
          var today = moment(now).add(4, "hours").valueOf();
          var lastDay = (today) + 7 * 24 * 60 * 60 * 1000;
          if((event.startDate) > (today) && (event.startDate) < (lastDay)){
            //console.log(event);
            if(event.browseEvent && event.browseEvent.id){
              var browseevent = {
                id:event.browseEvent.id,
                EventName:event.browseEvent.get('EventName'),
                BrowseEventImg:event.browseEvent.get('BrowseEventImg')
              };
              var flag = false;
              for(var j in this.browseEventList){
                if(this.browseEventList[j].id == browseevent.id)
                  flag = true;
              }
              //console.log(browseevent);
              if(flag == false)
                this.browseEventList.push(browseevent);
            }
          }
        }
      }else{
        this.showToast(data.message);
      }
    });
  }

  loadBrowseVenueData(){
      this.browseVenueList = new Array();
      // this.loading.present();
      this.services.getEventAll().subscribe(data=>{
          // this.loading.dismiss();
          if(this.services.getStatus){
            for(var index in data){
            var event = {
              id:data[index].id,
              browseVenue:data[index].get('browseVenue'),
              startDate:moment(data[index].get('startDate')).valueOf(),
              venue:data[index].get('venue'),
            };
            var now = new Date();
            var today = moment(now).add(4, "hours").valueOf();
            var lastDay = (today) + 7 * 24 * 60 * 60 * 1000;
            if((event.startDate) > (today) && (event.startDate) < (lastDay)){

              if(event.browseVenue && event.browseVenue.id){

                var browseVenue = {
                  id:event.browseVenue.id,
                  VenueName:event.browseVenue.get('VenueName'),
                  VenueThumImag:event.venue.get('imageThumbURL')
                };

                var flag = false;
                for(var j in this.browseVenueList){
                  if(this.browseVenueList[j].id == browseVenue.id)
                    flag = true;
                }
                //console.log(browseevent);
                if(flag == false)
                  this.browseVenueList.push(browseVenue);
              }
            }
          }
          }else{
            this.showToast(data.message);
          }
      });
  }


  
  loadBrowseVenueTypeData(){
      this.browseVenueTypeList = new Array();
      // this.loading.present();
      this.services.getVenueAll().subscribe(data=>{
        // this.loading.dismiss();
        if(this.services.getStatus){
          for(var index in data){

            var event = {
              id:data[index].id,
              name:data[index].get('name'),
              browseVenueType:data[index].get('browseVenueType')
            };

            if(event.browseVenueType && event.browseVenueType.id){

                var browseVenueType = {
                  id:event.browseVenueType.id,
                  VenueTypeName:event.browseVenueType.get('VenueTypeName'),
                  VenueTypeThumImg:event.browseVenueType.get('VenueTypeThumImg')
                };

                var flag = false;
                for(var j in this.browseVenueTypeList){
                  if(this.browseVenueTypeList[j].id == browseVenueType.id)
                    flag = true;
                }
                //console.log(browseevent);
                if(flag == false)
                {
                  this.browseVenueTypeList.push(browseVenueType);
                }
            }

            //this.browseVenueTypeList.push(event);
          }
        }else{
          this.showToast(data.message);
        }
      });
  }

  

  goEventCategory(item){
    // $state.go("app.browseCategory", {selectedData:angular.toJson({type:"event", id:item.id, name:item.EventName})});
    this.navCtrl.push(BrowseCategory, {selectedData:JSON.stringify({type:"event", id:item.id, name:item.EventName})});
  }

  goVenueCategory(item){
    //$state.go("app.browseCategory", {selectedData:angular.toJson({type:"venue", id:item.id, name:item.VenueName})});
    // $state.go("app.browseCategory", {selectedData:angular.toJson({type:"venue", id:item.id, name:item.EventName})});
    this.navCtrl.push(BrowseCategory, {selectedData:JSON.stringify({type:"event", id:item.id, name:item.EventName})});
  }

  goVenueTypeCategory(item){
    // $state.go("app.browseCategory", {selectedData:angular.toJson({type:"venueType", id:item.id, name:item.VenueTypeName})});
    this.navCtrl.push(BrowseCategory, {selectedData:JSON.stringify({type:"event", id:item.id, name:item.VenueTypeName})});
  }
}
