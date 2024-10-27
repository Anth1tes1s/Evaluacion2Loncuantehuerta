import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private conductorSeleccionado: any;

  constructor() {}

  // Método para seleccionar un conductor y guardar su información
  seleccionarConductor(conductor: any) {
    this.conductorSeleccionado = conductor;
  }

  // Método para obtener la información del conductor seleccionado
  obtenerConductorSeleccionado() {
    return this.conductorSeleccionado;
  }

  // Método para liberar el viaje, eliminando la información del conductor
  liberarViaje() {
    this.conductorSeleccionado = null;
  }
}
