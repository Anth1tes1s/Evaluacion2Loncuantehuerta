import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioconductorPage } from './servicioconductor.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioconductorPageRoutingModule {}
