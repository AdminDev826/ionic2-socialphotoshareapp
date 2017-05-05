import { Component } from '@angular/core';
import { NavController, ModalController, Events, LoadingController } from 'ionic-angular';
import { Parse } from 'parse';
import { EventDetail } from "../event-detail/event-detail";
import { Services } from "../../providers/services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventTileList = new Array();
  eventSliderList = new Array();

  loading: any;
  homeOptions = {
    initialSlide: 0,
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction: false
  };

  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  offset = 100;
  
  


  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public events: Events, private services: Services) {

    events.publish('user:created', "test user", "../assets/img/image.png");

    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });

    this.loadEventsData();
  }

  loadEventsData(){
    this.eventTileList = new Array();
    this.eventSliderList = new Array();
    this.loading.present();

    this.services.getEventAll().subscribe(data=> {
      this.loading.dismiss();
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
          timestamp:data[index].get('startDate')
        };
        this.eventSliderList.push(event);
        this.eventTileList.push(event);
      }
      
    });

    
  }

  goDetail(item){
    this.navCtrl.push(EventDetail, {selectedEvent:JSON.stringify(item)});
  }

  goSliderDetail(item){
    this.navCtrl.push(EventDetail, {selectedEvent:JSON.stringify(item)});
  }
  

}
