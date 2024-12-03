import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuconductorPageRoutingModule } from './menuconductor-routing.module';

import { MenuconductorPage } from './menuconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuconductorPageRoutingModule
  ],
  declarations: [MenuconductorPage]
})
export class MenuconductorPageModule {}
