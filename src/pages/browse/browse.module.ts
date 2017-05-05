import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Browse } from './browse';

@NgModule({
  declarations: [
    Browse,
  ],
  imports: [
    IonicPageModule.forChild(Browse),
  ],
  exports: [
    Browse
  ]
})
export class BrowseModule {}
