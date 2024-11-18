import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router

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
    this.cargarDatos(); // Cargar los datos si existen al iniciar la página
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
  
  async registrarUsuario() {
    // Validar que todos los campos estén llenos
    if (!this.nombre || !this.apellido || !this.usuario || !this.edad || !this.correo || !this.telefono || !this.contrasenia) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si hay campos vacíos
    }

    const nuevoUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      edad: this.edad,
      correo: this.correo,
      telefono: this.telefono,
      contrasenia: this.contrasenia
    };

    // Verificar si el usuario puede ser registrado
    if (this.verificacionService.registrarUsuario(nuevoUsuario)) {
      // Guardar los datos del formulario en localStorage antes de redirigir
      this.guardarDatos();

      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/menu']); // Redirigir al usuario a la página de inicio
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario ya existe. Intente con otro nombre de usuario.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
