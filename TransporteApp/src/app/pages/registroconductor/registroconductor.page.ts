import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Esto es opcional si sigues usando Storage
import { ViajeService } from 'src/app/viaje.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-registroconductor',
  templateUrl: './registroconductor.page.html',
  styleUrls: ['./registroconductor.page.scss'],
})
export class RegistroconductorPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  matricula: string = '';
  tipoVehiculo: string = '';
  origen: string = 'Av. Vicuña Mackenna 4917, 8970117 San Joaquín, Región Metropolitana'; // Default origin
  destino: string = '';
  tarifaPorKilometro: number = 3500;
  distanciaEstimada: number = 0; // Distancia calculada
  precio: number = 0; // Precio calculado

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private storage: Storage,
    private viajeService: ViajeService // Servicio de viajes
  ) {}

  ngOnInit() {
    this.initMap(); // Inicializar el mapa al cargar el componente
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 1500,
    });
    await loading.present();
  }

  async someAsyncOperation() {
    await this.presentLoading();
  }

  initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile (ejemplo)
      zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    google.maps.event.addListener(map, 'click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.destino = `${event.latLng.lat()}, ${event.latLng.lng()}`;
      }
    });
  }

  calcularRuta() {
    if (!this.origen || !this.destino) {
      alert('Por favor, ingresa ambas direcciones.');
      return;
    }

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.origen],
        destinations: [this.destino],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          const elements = response.rows[0].elements;
          if (elements[0].status === 'OK') {
            this.distanciaEstimada = elements[0].distance.value / 1000; // Convertir a kilómetros
            this.precio = this.calcularPrecio();
            this.mostrarRuta(); // Mostrar la ruta en el mapa
          } else {
            alert('No se pudo calcular la distancia.');
          }
        } else {
          alert('Error al obtener la distancia: ' + status);
        }
      }
    );
  }

  calcularPrecio(): number {
    return this.tarifaPorKilometro * this.distanciaEstimada;
  }

  mostrarRuta() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement);

    directionsRenderer.setMap(map);

    const request: google.maps.DirectionsRequest = {
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.setDirections(result);
      } else {
        alert('No se pudo calcular la ruta: ' + status);
      }
    });
  }

  async confirmarRuta() {
    const nuevaRuta = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      matricula: this.matricula,
      tipoVehiculo: this.tipoVehiculo,
      origen: this.origen,
      destino: this.destino,
      distancia: this.distanciaEstimada,
      precio: this.precio,
    };

    // Guardar el viaje en el servicio
    this.viajeService.agregarViaje(nuevaRuta);

    alert('Ruta confirmada y guardada.');
    this.router.navigate(['/inicio-conductor']); // Redirige a la página de inicio del conductor
  }
}
