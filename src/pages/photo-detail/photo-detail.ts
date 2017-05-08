import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { Services } from "../../providers/services";



@IonicPage()
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetail {

  @ViewChild(Slides) slides: Slides;

  selectedPhoto: any;
  photoTileList: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: Services, 
    private viewCtrl: ViewController
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
  closePhotoDetail(){
    this.viewCtrl.dismiss();
  }
  shareImg(){
    var i = this.slides.getActiveIndex();
    console.log(i);
    // window.plugins.socialsharing.shareViaInstagram('', $scope.photoTileList[$ionicSlideBoxDelegate.currentIndex()].filename, function() {console.log('share ok')}, function(errormsg){console.log(errormsg)});
  }

}
