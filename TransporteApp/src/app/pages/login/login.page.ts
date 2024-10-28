import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = ''; // Inicializar como cadena vacía
  contrasenia: string = ''; // Inicializar como cadena vacía

  constructor(private verificacionService: VerificacionService, private alertController: AlertController, private router: Router) {}

  async iniciarSesion() {
    // Validar que los campos no estén vacíos
    if (!this.usuario || !this.contrasenia) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si hay campos vacíos
    }

    const usuarios = this.verificacionService.obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(user => user.usuario === this.usuario && user.contrasenia === this.contrasenia);

    if (usuarioEncontrado) {
      // Guardar token de autenticación
      localStorage.setItem('authToken', 'your-auth-token'); // Token de autenticación simple

      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: 'Usuario ingresado correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/iniciousuario']); // Redirigir al usuario a la página de inicio
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingreso de datos incorrectos, inténtelo nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
