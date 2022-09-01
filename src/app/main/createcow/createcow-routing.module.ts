import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatecowPage } from './createcow.page';

const routes: Routes = [
  {
    path: '',
    component: CreatecowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatecowPageRoutingModule {}
