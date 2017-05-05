import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Forgotpassword } from './forgotpassword';

@NgModule({
  declarations: [
    Forgotpassword,
  ],
  imports: [
    IonicPageModule.forChild(Forgotpassword),
  ],
  exports: [
    Forgotpassword
  ]
})
export class ForgotpasswordModule {}
