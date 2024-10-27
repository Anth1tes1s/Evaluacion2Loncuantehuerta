import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importación correcta del IonicModule
import { RecuperarcontrasniaPageRoutingModule } from './recuperarcontrasnia-routing.module';
import { RecuperarContrasniaPage } from './recuperarcontrasnia.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Asegúrate de que IonicModule esté incluido aquí
    RecuperarcontrasniaPageRoutingModule
  ],
  declarations: [RecuperarContrasniaPage]
})
export class RecuperarContrasniaPageModule {}
