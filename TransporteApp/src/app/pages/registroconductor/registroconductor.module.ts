import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroconductorPageRoutingModule } from './registroconductor-routing.module';

import { RegistroconductorPage } from './registroconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroconductorPageRoutingModule
  ],
  declarations: [RegistroconductorPage]
})
export class RegistroconductorPageModule {}
