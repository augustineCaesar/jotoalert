import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatecowPageRoutingModule } from './createcow-routing.module';

import { CreatecowPage } from './createcow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatecowPageRoutingModule
  ],
  declarations: [CreatecowPage]
})
export class CreatecowPageModule {}
