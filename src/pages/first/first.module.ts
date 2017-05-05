import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { First } from './first';

@NgModule({
  declarations: [
    First,
  ],
  imports: [
    IonicPageModule.forChild(First),
  ],
  exports: [
    First
  ]
})
export class FirstModule {}
