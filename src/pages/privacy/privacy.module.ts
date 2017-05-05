import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Privacy } from './privacy';

@NgModule({
  declarations: [
    Privacy,
  ],
  imports: [
    IonicPageModule.forChild(Privacy),
  ],
  exports: [
    Privacy
  ]
})
export class PrivacyModule {}
