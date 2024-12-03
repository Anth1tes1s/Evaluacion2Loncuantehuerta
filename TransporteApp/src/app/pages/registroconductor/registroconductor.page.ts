import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registroconductor',
  templateUrl: './registroconductor.page.html',
  styleUrls: ['./registroconductor.page.scss'],
})
export class RegistroconductorPage {
  nombre!: string;
  apellido!: string;
  edad!: number;
  tipoVehiculo!: string;
  patente!: string;
  contrasenia!: string;

  constructor(
    private verificacionService: VerificacionService, 
    private alertController: AlertController, 
    private router: Router
  ) {
    this.cargarDatos();
  }

  guardarDatos() {
    localStorage.setItem('conductorNombre', this.nombre);
    localStorage.setItem('conductorApellido', this.apellido);
    localStorage.setItem('conductorEdad', String(this.edad));
    localStorage.setItem('conductorTipoVehiculo', this.tipoVehiculo);
    localStorage.setItem('conductorPatente', this.patente);
    localStorage.setItem('conductorContrasenia', this.contrasenia);
  }

  cargarDatos() {
    this.nombre = localStorage.getItem('conductorNombre') || '';
    this.apellido = localStorage.getItem('conductorApellido') || '';
    this.edad = Number(localStorage.getItem('conductorEdad')) || 0;
    this.tipoVehiculo = localStorage.getItem('conductorTipoVehiculo') || '';
    this.patente = localStorage.getItem('conductorPatente') || '';
    this.contrasenia = localStorage.getItem('conductorContrasenia') || '';
  }

  async registrarConductor() {
    if (!this.nombre || !this.apellido || !this.edad || !this.tipoVehiculo || !this.patente || !this.contrasenia) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirmar registro',
      message: '¿Estás seguro que quieres registrar este conductor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const nuevoConductor = {
              nombre: this.nombre,
              apellido: this.apellido,
              edad: this.edad,
              tipoVehiculo: this.tipoVehiculo,
              patente: this.patente,
              contrasenia: this.contrasenia
            };

            if (this.verificacionService.registrarConductor(nuevoConductor)) {
              this.guardarDatos();

              const successAlert = await this.alertController.create({
                header: 'Registro Exitoso',
                message: 'Conductor registrado correctamente',
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['/menuconductor']);
                  }
                }]
              });
              await successAlert.present();
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'La patente ya está registrada. Intente con otra patente.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });

    await confirmAlert.present();
  }
}
