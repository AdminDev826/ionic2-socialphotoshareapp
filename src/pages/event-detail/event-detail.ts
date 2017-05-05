import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.event = JSON.parse(navParams.get("selectedEvent"));
    console.log(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetail');
  }

}
