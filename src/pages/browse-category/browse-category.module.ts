import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseCategory } from './browse-category';

@NgModule({
  declarations: [
    BrowseCategory,
  ],
  imports: [
    IonicPageModule.forChild(BrowseCategory),
  ],
  exports: [
    BrowseCategory
  ]
})
export class BrowseCategoryModule {}
