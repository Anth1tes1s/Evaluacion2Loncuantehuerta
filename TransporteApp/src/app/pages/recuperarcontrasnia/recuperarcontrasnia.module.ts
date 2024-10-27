import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontrasniaPageRoutingModule } from './recuperarcontrasnia-routing.module';

import { RecuperarcontrasniaPage } from './recuperarcontrasnia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarcontrasniaPageRoutingModule
  ],
  declarations: [RecuperarcontrasniaPage]
})
export class RecuperarcontrasniaPageModule {}
