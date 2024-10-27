import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  private usuariosRegistrados: Array<any> = [];

  constructor() { }

  // Validar si el usuario ya existe
  verificarUsuarioExiste(usuario: string): boolean {
    return this.usuariosRegistrados.some(user => user.usuario === usuario);
  }

  // Registrar un nuevo usuario
  registrarUsuario(nuevoUsuario: any): boolean {
    if (this.verificarUsuarioExiste(nuevoUsuario.usuario)) {
      return false; // Usuario ya existe
    }
    this.usuariosRegistrados.push(nuevoUsuario);
    return true; // Usuario registrado correctamente
  }

  // Método para obtener todos los usuarios (lo usaremos luego para el CRUD)
  obtenerUsuarios(): Array<any> {
    return this.usuariosRegistrados;
  }
}
