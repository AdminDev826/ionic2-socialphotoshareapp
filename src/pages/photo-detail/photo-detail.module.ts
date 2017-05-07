import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetail } from './photo-detail';

@NgModule({
  declarations: [
    PhotoDetail,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetail),
  ],
  exports: [
    PhotoDetail
  ]
})
export class PhotoDetailModule {}
