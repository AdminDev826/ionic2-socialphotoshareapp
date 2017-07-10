import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import * as moment from "moment";
import { PhotoDetail } from "../photo-detail/photo-detail";


@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class Gallery {

  selectedGallery: any;
  photoTileList = new Array();
  loading: any;
  selectedPhoto: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modal: ModalController,
    private services: Services
    ) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: ''
      });
      console.log(navParams.get("selectedPhoto"));
      // this.selectedGallery = JSON.parse(navParams.get("selectedPhoto"));
      this.selectedGallery = navParams.get("selectedPhoto");
      console.log(this.selectedGallery);
      this.loadEventsData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gallery');
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
    this.photoTileList = new Array();
    this.loading.present();
    this.services.getGalleryAllPhotos().subscribe(data => {
      this.loading.dismiss();
      if(this.services.getStatus){
        for(var index in data){
          var event = {
            id:data[index].id,
            gallery:data[index].get('gallery'),
            title:data[index].get('title'),
            eventDate:moment(data[index].get('createdAt')).format("MMMM Do YYYY"),
            filename:data[index].get('filename')
          };

          if((event.gallery != undefined) && (event.gallery.id == this.selectedGallery.id))
          {
            this.photoTileList.push(event);
          }
        }
        this.services.setPhotoTileList(this.photoTileList);
      }else{
        this.showToast(data.message);
      }
    });
  }

  showPhotoDetail(index) {
    var data = this.photoTileList[index];
    var mmodal = this.modal.create(PhotoDetail, {selectedPhoto: data, index: index, title: this.selectedGallery.title});
    mmodal.onDidDismiss(item => {
      if (!item) {
        return;
      }
    });
    mmodal.present();
    // this.modal.show();
    // $timeout(function(){
    //   $ionicSlideBoxDelegate.slide(index, 100);
    //   this.selectedPhoto = this.photoTileList[$ionicSlideBoxDelegate.currentIndex()];
    // }, 300);
  }

  slideHasChanged(index){
    this.selectedPhoto = this.photoTileList[index];
  }

  shareImg(){
    // console.log($ionicSlideBoxDelegate.currentIndex());
    // window.plugins.socialsharing.shareViaInstagram('', this.photoTileList[$ionicSlideBoxDelegate.currentIndex()].filename, function() {console.log('share ok')}, function(errormsg){console.log(errormsg)});
  }

}
