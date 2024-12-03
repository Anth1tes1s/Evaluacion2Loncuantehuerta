import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  conductorSeleccionado: any;
  viajes: any[] = [];
  conductores: any[] = [];
  viajesConConductor: any[] = [];
  vehiculos: any[] = [];

  constructor(
    private router: Router,
    private conductorService: ConductorService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    await this.cargarViajes();
  }

  async cargarViajes() {
    this.viajes = await this.storage.get('viajes') || [];
  }

  async eliminarViaje(index: number) {
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar este viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.viajes.splice(index, 1);
            await this.storage.set('viajes', this.viajes);
            this.mostrarToast('Viaje eliminado correctamente');
          }
        }
      ]
    });
    await alert.present();
  }

  async editarViaje(viaje: any, index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Modificar Precio',
      inputs: [
        {
          name: 'precio',
          type: 'number',
          placeholder: 'Nuevo precio',
          value: viaje.precio
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.precio && data.precio > 0) {
              try {
                this.viajes[index] = {
                  ...viaje,
                  precio: data.precio
                };
                
                await this.storage.set('viajes', this.viajes);
                await this.mostrarToast('Precio actualizado correctamente');
                await this.cargarDatos();
                return true;
              } catch (error) {
                await this.mostrarToast('Error al actualizar el precio');
                return false;
              }
            } else {
              await this.mostrarToast('Por favor ingrese un precio válido');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async cargarDatos() {
    // Cargar viajes y conductores
    this.viajes = await this.storage.get('viajes') || [];
    const conductores = JSON.parse(localStorage.getItem('conductores') || '[]');
    
    // Combinar la información de viajes con los datos del conductor
    this.viajesConConductor = this.viajes.map(viaje => {
      const conductor = conductores[conductores.length - 1];
      return {
        ...viaje,
        nombreConductor: conductor.nombre,
        apellidoConductor: conductor.apellido,
        edadConductor: conductor.edad,
        patenteConductor: conductor.patente,
        tipoVehiculoConductor: conductor.tipoVehiculo
      };
    });
  }

  ngOnInit() {
    this.cargarDatos();
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

  async cargarDatosVehiculos() {
    this.vehiculos = await this.storage.get('conductores') || [];
  }

  async editarVehiculo(vehiculo: any, index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Datos del Vehículo',
      inputs: [
        {
          name: 'matricula',
          type: 'text',
          value: vehiculo.matricula,
          placeholder: 'Matrícula'
        },
        {
          name: 'tipoVehiculo',
          type: 'text',
          value: vehiculo.tipoVehiculo,
          placeholder: 'Tipo de Vehículo'
        },
        {
          name: 'modelo',
          type: 'text',
          value: vehiculo.modelo,
          placeholder: 'Modelo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            this.vehiculos[index] = {
              ...vehiculo,
              matricula: data.matricula,
              tipoVehiculo: data.tipoVehiculo,
              modelo: data.modelo
            };
            await this.storage.set('conductores', this.vehiculos);
            this.mostrarToast('Datos del vehículo actualizados');
          }
        }
      ]
    });
    await alert.present();
  }

  ordenarViajes(criterio: string) {
    switch(criterio) {
      case 'fecha':
        this.viajes.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'precio':
        this.viajes.sort((a, b) => b.precio - a.precio);
        break;
      case 'distancia':
        this.viajes.sort((a, b) => b.distancia - a.distancia);
        break;
    }
  }
}
