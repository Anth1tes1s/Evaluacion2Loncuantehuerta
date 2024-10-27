import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicioconductor',
  templateUrl: './inicioconductor.page.html',
  styleUrls: ['./inicioconductor.page.scss'],
})
export class InicioconductorPage {
  viajesDisponibles = [
    { destino: 'Aeropuerto', cliente: 'Juan Pérez', hora: '14:30', origen: 'Plaza de Armas', distancia: 20 },
    { destino: 'Centro Comercial', cliente: 'María López', hora: '15:00', origen: 'Estación Central', distancia: 15 },
    { destino: 'Hospital', cliente: 'Pedro González', hora: '15:30', origen: 'Universidad de Chile', distancia: 10 }
  ];

  constructor(private router: Router) {}

  seleccionarViaje(viaje: any) {
    this.router.navigate(['/servicioconductor'], { state: { viaje } });
  }
}

