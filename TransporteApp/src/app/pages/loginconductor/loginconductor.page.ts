import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginconductor',
  templateUrl: './loginconductor.page.html',
  styleUrls: ['./loginconductor.page.scss'],
})
export class LoginconductorPage {
  patente: string = '';
  contrasenia: string = '';

  constructor(
    private verificacionService: VerificacionService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async iniciarSesion() {
    if (!this.patente || !this.contrasenia) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const conductores = JSON.parse(localStorage.getItem('conductores') || '[]');
    const conductorEncontrado = conductores.find(
      (c: any) => c.patente === this.patente && c.contrasenia === this.contrasenia
    );

    if (conductorEncontrado) {
      localStorage.setItem('conductorActual', JSON.stringify(conductorEncontrado));
      
      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: 'Conductor ingresado correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/menuconductor']);
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Patente o contraseña incorrecta.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
