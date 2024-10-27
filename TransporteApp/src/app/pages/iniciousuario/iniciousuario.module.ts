import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciousuarioPageRoutingModule } from './iniciousuario-routing.module';

import { IniciousuarioPage } from './iniciousuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciousuarioPageRoutingModule
  ],
  declarations: [IniciousuarioPage]
})
export class IniciousuarioPageModule {}
