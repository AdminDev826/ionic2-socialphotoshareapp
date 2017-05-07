import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from "../../providers/services";



@IonicPage()
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetail {

  selectedPhoto: any;
  photoTileList: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: Services, 
    ) {
      this.selectedPhoto = this.navParams.get("selectedPhoto");
      console.log(this.selectedPhoto);
      this.photoTileList = this.services.getPhotoTileList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoDetail');
  }
  slideHasChanged(index){
    console.log(index);
  }

}
