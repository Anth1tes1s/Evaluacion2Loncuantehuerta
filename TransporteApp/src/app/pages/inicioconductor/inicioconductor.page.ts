import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/viaje.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-inicioconductor',
  templateUrl: './inicioconductor.page.html',
  styleUrls: ['./inicioconductor.page.scss'],
})
export class InicioconductorPage implements OnInit {

  // Lista de viajes obtenidos desde el servicio
  viajes: any[] = [];

  constructor(private viajeService: ViajeService,
    private router: Router) {}

  ngOnInit() {
    // Obtener los viajes del servicio
    this.viajes = this.viajeService.obtenerViajes();
    console.log('Viajes disponibles:', this.viajes);
  }

  // Método para seleccionar un viaje y redirigir a servicio
  seleccionarViaje(viaje: any) {
    console.log('Viaje seleccionado:', viaje);
    // Navegar a la página de servicio pasando el viaje
    // Asegúrate de que la ruta esté configurada correctamente
    this.router.navigate(['/servicio'], { state: { viaje: viaje } });
  }
}
