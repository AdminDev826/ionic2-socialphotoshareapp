import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePassword } from './change-password';

@NgModule({
  declarations: [
    ChangePassword,
  ],
  imports: [
    IonicPageModule.forChild(ChangePassword),
  ],
  exports: [
    ChangePassword
  ]
})
export class ChangePasswordModule {}
