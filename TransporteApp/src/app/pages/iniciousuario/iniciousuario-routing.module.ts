import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciousuarioPage } from './iniciousuario.page';

const routes: Routes = [
  {
    path: '',
    component: IniciousuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciousuarioPageRoutingModule {}
