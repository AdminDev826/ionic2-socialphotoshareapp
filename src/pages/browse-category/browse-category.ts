import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import * as moment from "moment";
import { EventDetail } from "../event-detail/event-detail";
import { VenueDetail } from "../venue-detail/venue-detail";



@IonicPage()
@Component({
  selector: 'page-browse-category',
  templateUrl: 'browse-category.html',
})
export class BrowseCategory {

  loading: any;
  selectedData: any;
  eventTileList: any;
  sortedArray: any;

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
    this.selectedData = JSON.parse(this.navParams.get("selectedData"));
    console.log(this.selectedData);
    this.loadEventsData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseCategory');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  loadEventsData() {
    this.eventTileList = new Array();
    this.loading.present();
    var _tthis = this;
    this.services.getEventAll().subscribe(data => {
      this.loading.dismiss();
      if (this.services.getStatus) {
        var now = new Date();
        var today = moment(now).add(-4, "hours").valueOf();

        for (var index in data) {
          var event = {
            id: data[index].id,
            videoStillURL: data[index].get('videoStillURL'),
            dressCode: data[index].get('dressCode'),
            active: data[index].get('active'),
            dayOfWeek: data[index].get('dayOfWeek'),
            theme: data[index].get('theme'),
            endDate: data[index].get('endDate'),
            name: data[index].get('name'),
            venue: data[index].get('venue'),
            venueId: data[index].get('venue') ? data[index].get('venue').id : '0',
            venueLogo: data[index].get('venue') ? data[index].get('venue').get("imageThumbURL") : '0',
            startDate: data[index].get('startDate'),
            desc: data[index].get('desc'),
            ordering: data[index].get('ordering'),
            imageURL: data[index].get('imageURL'),
            imageThumbURL: data[index].get('imageThumbURL'),
            imageFeatureURL: data[index].get('imageFeatureURL'),
            videoURL: data[index].get('videoURL'),
            feature: data[index].get('feature'),
            deleted: data[index].get('deleted'),
            age: data[index].get('age'),
            description: data[index].get('description'),
            timestamp: moment(data[index].get('startDate')).valueOf(),
            browseVenue: data[index].get('browseVenue'),
            browseEvent: data[index].get('browseEvent'),
            browseVenueType: { id: "" },
            formatted_date: ""
          };
          if (event.venue) {
            // var venueType = event.venue.get('browseVenueType');
            event.browseVenueType = event.venue.get('browseVenueType');
          }

          event.formatted_date = moment(event.startDate).format("MMMM Do YYYY");

          if ((event.timestamp >= today) && (event.timestamp <= ((today) + 7 * 24 * 60 * 60 * 1000))) {
            _tthis.eventTileList.push(event);
            //if(event.feature == 1){
            if (_tthis.selectedData.type == "event" && event.browseEvent && this.selectedData.id == event.browseEvent.id) {
              _tthis.eventTileList.push(event);
            }

            if (_tthis.selectedData.type == "venue" && event.browseEvent && _tthis.selectedData.id == event.browseEvent.id) {
              var flag = false;
              for (var i in _tthis.eventTileList) {
                if (event.venueId == _tthis.eventTileList[i].venueId) {
                  flag = true;
                }
              }
              if (flag == false) {
                event.imageThumbURL = event.venueLogo;
                _tthis.eventTileList.push(event);
              }
            }

            // if(this.selectedData.type == "venue" && event.browseVenue && this.selectedData.id == event.browseVenue.id)
            // {
            //   event.imageThumbURL = event.venueLogo;
            //   this.eventTileList.push(event);
            // }

            if (_tthis.selectedData.type == "venueType" && event.browseVenueType && _tthis.selectedData.id == event.browseVenueType.id) {
              var flag = false;
              for (var i in _tthis.eventTileList) {
                if (event.venueId == _tthis.eventTileList[i].venueId) {
                  flag = true;
                }
              }
              if (flag == false) {
                event.imageThumbURL = event.venueLogo;
                _tthis.eventTileList.push(event);
              }
            }

            // this.sortedArray = $filter('orderBy')(this.eventTileList, 'timestamp', false);
            // this.eventTileList = this.sortedArray;
            //}
          }
        }
        console.log("TaG========>", this.eventTileList);
        // this.sortedArray = $filter('orderBy')(this.eventTileList, 'timestamp', false);
        this.sortedArray = this.eventTileList.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        this.eventTileList = this.sortedArray;
      } else {
        this.showToast(data.message);
      }
    });
  }

  goDetail(item) {
    if (this.selectedData.type == "venue" || this.selectedData.type == "venueType") {
      // $state.go("app.venue_detail", {selectedEvent:angular.toJson(item)});
      this.navCtrl.push(VenueDetail, { selectedEvent: JSON.stringify(item) });
    } else {
      // $state.go("app.event_detail", {selectedEvent:angular.toJson(item)});
      this.navCtrl.push(EventDetail, { selectedEvent: JSON.stringify(item) });
    }
  }

}
