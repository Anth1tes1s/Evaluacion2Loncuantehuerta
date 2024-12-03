import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuconductorPage } from './menuconductor.page';

const routes: Routes = [
  {
    path: '',
    component: MenuconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuconductorPageRoutingModule {}
