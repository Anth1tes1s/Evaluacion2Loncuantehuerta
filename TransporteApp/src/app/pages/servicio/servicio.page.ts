import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  conductorSeleccionado: any;

  constructor(private router: Router, private conductorService: ConductorService) {}

  ngOnInit() {
    // Crear información ficticia del conductor
    this.conductorSeleccionado = {
      nombre: 'Juan Pérez',
      modelo: 'Toyota Corolla',
      color: 'Rojo',
      ubicacion: 'Calle Falsa 123',
      origen: 'Calle 1, Santiago, Chile',
      destino: 'Calle 2, Santiago, Chile',
    };
    this.initMap(); // Inicializar el mapa al cargar la página
  }

  initMap() {
    // Inicializa el mapa
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -33.4489, lng: -70.6693 }, // Cambiar por la ubicación deseada
      zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    
    // Mostrar la ruta del viaje
    this.mostrarRuta(map);
  }

  mostrarRuta(map: google.maps.Map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Usar la información ficticia del conductor
    const request: google.maps.DirectionsRequest = {
      origin: this.conductorSeleccionado.origen, // Origen ficticio
      destination: this.conductorSeleccionado.destino, // Destino ficticio
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

  cancelarViaje() {
    this.conductorService.liberarViaje();
    this.router.navigate(['/iniciousuario']);
  }
}
