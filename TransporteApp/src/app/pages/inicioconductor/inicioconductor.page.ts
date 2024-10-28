import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicioconductor',
  templateUrl: './inicioconductor.page.html',
  styleUrls: ['./inicioconductor.page.scss'],
})
export class InicioconductorPage {
  viajesDisponibles = [
    { destino: 'Aeropuerto Internacional Arturo Merino Benítez, Santiago, Chile', cliente: 'Juan Pérez', hora: '14:30', origen: 'Plaza de Armas, Santiago, Chile', distancia: 20 },
    { destino: 'Centro Comercial Costanera Center, Santiago, Chile', cliente: 'María López', hora: '15:00', origen: 'Estación Central, Santiago, Chile', distancia: 15 },
    { destino: 'Hospital Clínico Universidad de Chile, Santiago, Chile', cliente: 'Pedro González', hora: '15:30', origen: 'Universidad de Chile, Santiago, Chile', distancia: 10 }
  ];

  constructor(private router: Router) {}

  seleccionarViaje(viaje: any) {
    this.router.navigate(['/servicioconductor'], { state: { viaje } });
  }
}
