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

  // Método para verificar autenticación
  isAuthenticated(): boolean {
    // Verifica si existe un token en el almacenamiento local
    return !!localStorage.getItem('authToken');
  }

  registrarConductor(conductor: any): boolean {
    const conductores = JSON.parse(localStorage.getItem('conductores') || '[]');
    if (conductores.some((c: any) => c.patente === conductor.patente)) {
      return false;
    }
    conductores.push(conductor);
    localStorage.setItem('conductores', JSON.stringify(conductores));
    return true;
  }
}
