import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarContrasniaPage  } from './recuperarcontrasnia.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContrasniaPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarcontrasniaPageRoutingModule {}
