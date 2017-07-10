import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import * as moment from "moment";
import { Gallery } from "../gallery/gallery";


@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class Photos {

  eventTileList = new Array();
  loading: any;
  selectedPhoto = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: Services,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: ''
      });
      this.loadEventsData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Photos');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  loadEventsData(){
    this.eventTileList = new Array();
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
          this.eventTileList.push(event);
        }
      }else{
        this.showToast(data.message);
      }
    });
  }

  // Triggered in the login modal to close it
  closePhotoDetail() {
  }

  showPhotoDetail(item) {
    this.selectedPhoto = item;
    console.log(this.selectedPhoto);
  }

  goPhotoGallery(item) {
    let s_item = JSON.stringify(item);
    this.navCtrl.push(Gallery, {selectedPhoto:JSON.parse(s_item)});
  }

}
