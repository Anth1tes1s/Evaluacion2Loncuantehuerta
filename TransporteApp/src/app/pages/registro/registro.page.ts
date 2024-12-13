import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  nombre!: string;
  apellido!: string;
  usuario!: string;
  edad!: number;
  correo!: string;
  telefono!: string;
  contrasenia!: string;

  constructor(private verificacionService: VerificacionService, private alertController: AlertController, private router: Router) {
    this.cargarDatos(); 
  }

  guardarDatos() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('usuario', this.usuario);
    localStorage.setItem('edad', String(this.edad));
    localStorage.setItem('correo', this.correo);
    localStorage.setItem('telefono', this.telefono);
    localStorage.setItem('contrasenia', this.contrasenia);
  }

  cargarDatos() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.apellido = localStorage.getItem('apellido') || '';
    this.usuario = localStorage.getItem('usuario') || '';
    this.edad = Number(localStorage.getItem('edad')) || 0;
    this.correo = localStorage.getItem('correo') || '';
    this.telefono = localStorage.getItem('telefono') || '';
    this.contrasenia = localStorage.getItem('contrasenia') || '';
  }

  validarCorreo(correo: string): boolean {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correoRegex.test(correo);
  }

  validarTelefono(telefono: string): boolean {
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(telefono);
  }

  async registrarUsuario() {
    if (!this.nombre || !this.apellido || !this.usuario || !this.edad || !this.correo || !this.telefono || !this.contrasenia) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.validarCorreo(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingrese un correo válido.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.validarTelefono(this.telefono)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El teléfono debe contener exactamente 9 dígitos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirmar registro',
      message: '¿Estás seguro que quieres registrar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const nuevoUsuario = {
              nombre: this.nombre,
              apellido: this.apellido,
              usuario: this.usuario,
              edad: this.edad,
              correo: this.correo,
              telefono: this.telefono,
              contrasenia: this.contrasenia
            };

            if (this.verificacionService.registrarUsuario(nuevoUsuario)) {
              this.guardarDatos();

              const successAlert = await this.alertController.create({
                header: 'Registro Exitoso',
                message: 'Usuario registrado correctamente',
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['/menu']);
                  }
                }]
              });
              await successAlert.present();
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'El usuario ya existe. Intente con otro nombre de usuario.',
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
