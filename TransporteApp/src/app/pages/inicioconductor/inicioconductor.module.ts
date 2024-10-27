import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioconductorPageRoutingModule } from './inicioconductor-routing.module';

import { InicioconductorPage } from './inicioconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioconductorPageRoutingModule
  ],
  declarations: [InicioconductorPage]
})
export class InicioconductorPageModule {}
