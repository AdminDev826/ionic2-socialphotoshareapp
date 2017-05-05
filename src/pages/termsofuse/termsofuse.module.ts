import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Termsofuse } from './termsofuse';

@NgModule({
  declarations: [
    Termsofuse,
  ],
  imports: [
    IonicPageModule.forChild(Termsofuse),
  ],
  exports: [
    Termsofuse
  ]
})
export class TermsofuseModule {}
