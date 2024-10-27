import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarcontrasnia',
  templateUrl: './recuperarcontrasnia.page.html',
  styleUrls: ['./recuperarcontrasnia.page.scss'],
})
export class RecuperarContrasniaPage {

  nombre!: string;
  apellido!: string;
  usuario!: string;
  edad!: number;
  correo!: string;
  telefono!: string;
  contrasenia!: string;

  constructor(private verificacionService: VerificacionService, private alertController: AlertController) {}

  async recuperarContrasnia() {
    const usuarios = this.verificacionService.obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(user => 
      user.nombre === this.nombre &&
      user.apellido === this.apellido &&
      user.usuario === this.usuario &&
      user.edad === this.edad &&
      user.correo === this.correo &&
      user.telefono === this.telefono
    );

    if (usuarioEncontrado) {
      usuarioEncontrado.contrasenia = this.contrasenia; // Actualizar la contraseña
      const alert = await this.alertController.create({
        header: 'Contraseña Actualizada',
        message: 'Su contraseña ha sido actualizada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Datos no coinciden, verifique la información.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
