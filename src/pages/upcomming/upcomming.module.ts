import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Upcomming } from './upcomming';

@NgModule({
  declarations: [
    Upcomming,
  ],
  imports: [
    IonicPageModule.forChild(Upcomming),
  ],
  exports: [
    Upcomming
  ]
})
export class UpcommingModule {}
