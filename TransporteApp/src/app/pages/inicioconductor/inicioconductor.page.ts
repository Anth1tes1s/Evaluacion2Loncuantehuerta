import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-inicioconductor',
  templateUrl: './inicioconductor.page.html',
  styleUrls: ['./inicioconductor.page.scss'],
})
export class InicioconductorPage implements OnInit {
  conductorActual: any = null;
  viajes: any[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    await this.cargarDatos();
  }

  async cargarDatos() {
    // Cargar datos del conductor
    const conductores = await this.storage.get('conductores') || [];
    if (conductores.length > 0) {
      this.conductorActual = conductores[conductores.length - 1]; // Obtener el último conductor registrado
    }

    // Cargar viajes disponibles
    this.viajes = await this.storage.get('viajes') || [];
  }

  ngOnInit() {
  }
}
