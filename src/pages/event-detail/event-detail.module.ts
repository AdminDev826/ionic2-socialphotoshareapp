import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetail } from './event-detail';

@NgModule({
  declarations: [
    EventDetail,
  ],
  imports: [
    IonicPageModule.forChild(EventDetail),
  ],
  exports: [
    EventDetail
  ]
})
export class EventDetailModule {}
