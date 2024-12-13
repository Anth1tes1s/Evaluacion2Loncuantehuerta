import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-iniciousuario',
  templateUrl: './iniciousuario.page.html',
  styleUrls: ['./iniciousuario.page.scss'],
})
export class IniciousuarioPage implements OnInit {
  origen: string = 'Av. Vicuña Mackenna 4917, 8970117 San Joaquín, Región Metropolitana';
  destino: string = '';
  tarifaPorKilometro: number = 3500;
  distanciaEstimada: number = 0; // Distancia calculada
  precio: number = 0; // Precio calculado

  // Propiedad para almacenar rutas
  rutas: { origen: string; destino: string; distancia: number; precio: number }[] = [];

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private storage: Storage
  ) {
    this.initStorage();
  }

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

  initMap() {
    // Inicializa el mapa
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile
      zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  validarDestinoEnRegion(callback: (isValid: boolean) => void) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.destino }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const addressComponents = results[0].address_components;

        // Buscar la región en los componentes de la dirección
        const regionMetropolitana = addressComponents.some(component =>
          component.long_name.includes('Región Metropolitana')
        );

        if (regionMetropolitana) {
          callback(true);
        } else {
          alert('El destino debe estar dentro de la Región Metropolitana de Santiago.');
          callback(false);
        }
      } else {
        alert('No se pudo validar el destino: ' + status);
        callback(false);
      }
    });
  }

  calcularRuta() {
    if (!this.origen || !this.destino) {
      alert('Por favor, ingresa ambas direcciones.');
      return;
    }

    // Validar que el destino esté en la Región Metropolitana
    this.validarDestinoEnRegion((isValid) => {
      if (isValid) {
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
    });
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

  async initStorage() {
    await this.storage.create();
    // Cargar viajes existentes al iniciar
    this.cargarViajes();
  }

  async cargarViajes() {
    const viajes = await this.storage.get('viajes') || [];
    this.rutas = viajes;
  }

  async confirmarRuta() {
    const nuevoViaje = {
      origen: this.origen,
      destino: this.destino,
      distancia: this.distanciaEstimada,
      precio: this.precio,
      fecha: new Date().toISOString(),
    };

    // Obtener viajes existentes
    const viajesExistentes = await this.storage.get('viajes') || [];

    // Agregar el nuevo viaje
    viajesExistentes.push(nuevoViaje);

    // Guardar en storage
    await this.storage.set('viajes', viajesExistentes);

    // Actualizar la lista local
    this.rutas = viajesExistentes;

    // Redirigir a la página de servicio
    this.router.navigate(['/servicio']);
  }
  
    async someAsyncOperation() {
      await this.presentLoading();
  }
}
