import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registroconductor',
  templateUrl: './registroconductor.page.html',
  styleUrls: ['./registroconductor.page.scss'],
})
export class RegistroconductorPage {
  nombre: string = '';
  rut: string = '';
  matricula: string = '';
  tipoVehiculo: string = '';
  modeloVehiculo: string = '';
  colorVehiculo: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async registrarConductor() {
    // Validar que los campos no estén vacíos
    if (!this.nombre || !this.rut || !this.matricula || !this.tipoVehiculo || !this.modeloVehiculo || !this.colorVehiculo) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Aquí puedes agregar la lógica para guardar el conductor (ejemplo en un servicio)

    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Conductor registrado correctamente.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/inicioconductor']); // Redirigir al inicio del conductor
        }
      }]
    });
    await alert.present();
  }
}
