import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioconductorPage } from './inicioconductor.page';

const routes: Routes = [
  {
    path: '',
    component: InicioconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioconductorPageRoutingModule {}
