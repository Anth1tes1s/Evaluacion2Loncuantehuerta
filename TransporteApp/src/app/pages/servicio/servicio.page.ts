import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  viaje: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener los datos del viaje desde la navegación anterior
    this.viaje = history.state.viaje;
    console.log('Viaje recibido:', this.viaje);
  }
}
