import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Terms1 } from './terms1';

@NgModule({
  declarations: [
    Terms1,
  ],
  imports: [
    IonicPageModule.forChild(Terms1),
  ],
  exports: [
    Terms1
  ]
})
export class Terms1Module {}
