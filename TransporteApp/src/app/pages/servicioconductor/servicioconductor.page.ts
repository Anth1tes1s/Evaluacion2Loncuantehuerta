import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicioconductor',
  templateUrl: './servicioconductor.page.html',
  styleUrls: ['./servicioconductor.page.scss'],
})
export class ServicioconductorPage implements OnInit {
  origen: string = 'Plaza de Armas';
  destino: string = 'Aeropuerto';
  mapa: google.maps.Map | null = null;
  distanciaEstimada: number = 0;
  precio: number = 0;
  tarifaPorKilometro: number = 3500;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Intentar cargar el mapa cada vez que se abre la página
    setTimeout(() => this.initMap(), 100);
  }

  initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -33.4489, lng: -70.6693 },
      zoom: 12,
    };

    this.mapa = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  mostrarRuta() {
    if (!this.origen || !this.destino) {
      alert('Por favor, ingresa ambas direcciones.');
      return;
    }
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
  
    directionsRenderer.setMap(this.mapa);
  
    const request: google.maps.DirectionsRequest = {
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    directionsService.route(request, (result, status) => {
      if (status === 'OK' && result && result.routes[0] && result.routes[0].legs[0]) {
        // Acceso seguro a distance
        const distance = result.routes[0].legs[0].distance?.value;
        this.distanciaEstimada = (distance ?? 0) / 1000; // Convertir a km
        this.precio = this.calcularPrecio();
        directionsRenderer.setDirections(result);
      } else {
        alert('Error: No se pudo encontrar una ruta.');
      }
    });
  }
  

  calcularPrecio(): number {
    return this.distanciaEstimada * this.tarifaPorKilometro;
  }

  cancelarViaje() {
    // Aquí puedes agregar la lógica para cancelar el viaje
    alert('El viaje ha sido cancelado.');
  }
}
