import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarcontrasniaPage } from './recuperarcontrasnia.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarcontrasniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarcontrasniaPageRoutingModule {}
