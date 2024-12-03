import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicioconductor',
  templateUrl: './inicioconductor.page.html',
  styleUrls: ['./inicioconductor.page.scss'],
})
export class InicioconductorPage implements OnInit {
  conductorActual: any = null;
  viajes: any[] = [];
  viajesConConductor: any[] = [];

  constructor(
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    await this.cargarDatos();
  }

  async cargarDatos() {
    // Cargar viajes disponibles
    this.viajes = await this.storage.get('viajes') || [];
    const conductores = JSON.parse(localStorage.getItem('conductores') || '[]');
    
    // Combinar información de viajes con datos del conductor
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

  async aceptarViaje(viaje: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar viaje',
      message: '¿Deseas aceptar este viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            viaje.estadoViaje = 'aceptado';
            await this.storage.set('viajes', this.viajes);
            this.cargarDatos();
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }
}
