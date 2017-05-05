import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Photos } from './photos';

@NgModule({
  declarations: [
    Photos,
  ],
  imports: [
    IonicPageModule.forChild(Photos),
  ],
  exports: [
    Photos
  ]
})
export class PhotosModule {}
