import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioconductorPageRoutingModule } from './servicioconductor-routing.module';

import { ServicioconductorPage } from './servicioconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioconductorPageRoutingModule
  ],
  declarations: [ServicioconductorPage]
})
export class ServicioconductorPageModule {}
