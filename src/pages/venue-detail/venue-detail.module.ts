import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VenueDetail } from './venue-detail';

@NgModule({
  declarations: [
    VenueDetail,
  ],
  imports: [
    IonicPageModule.forChild(VenueDetail),
  ],
  exports: [
    VenueDetail
  ]
})
export class VenueDetailModule {}
