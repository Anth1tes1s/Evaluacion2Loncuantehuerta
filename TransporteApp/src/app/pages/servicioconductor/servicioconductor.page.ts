import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicioconductor',
  templateUrl: './servicioconductor.page.html',
  styleUrls: ['./servicioconductor.page.scss'],
})
export class ServicioconductorPage implements OnInit {
  origen: string = '';
  destino: string = '';
  mapa: google.maps.Map | null = null;
  distanciaEstimada: number = 0;
  precio: number = 0;
  tarifaPorKilometro: number = 3500;

  constructor(private alertController: AlertController, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { [key: string]: any };
      const viaje = state['viaje'];
      this.origen = viaje.origen;
      this.destino = viaje.destino;
    }
  }

  ngOnInit() {
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

    directionsService.route(request).then((result) => {
      if (result && result.routes.length > 0 && result.routes[0].legs.length > 0 && result.routes[0].legs[0].distance) {
        const distance = result.routes[0].legs[0].distance.value;
        this.distanciaEstimada = distance / 1000; // Convertir a km
        this.precio = this.calcularPrecio();
        directionsRenderer.setDirections(result);
      } else {
        alert('Error: No se pudo encontrar una ruta.');
      }
    }).catch((error) => {
      console.error('Error al obtener la ruta:', error);
    });
  }

  calcularPrecio(): number {
    return this.distanciaEstimada * this.tarifaPorKilometro;
  }

  cancelarViaje() {
    alert('El viaje ha sido cancelado.');
  }
}
