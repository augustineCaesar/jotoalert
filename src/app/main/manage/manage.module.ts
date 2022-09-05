import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ManagePageRoutingModule } from './manage-routing.module';

import { ManagePage } from './manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManagePageRoutingModule
  ],
  declarations: [ManagePage]
})
export class ManagePageModule {}
