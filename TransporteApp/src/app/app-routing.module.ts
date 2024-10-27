import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'iniciousuario',
    loadChildren: () => import('./pages/iniciousuario/iniciousuario.module').then( m => m.IniciousuarioPageModule)
  },
  {
    path: 'inicioconductor',
    loadChildren: () => import('./pages/inicioconductor/inicioconductor.module').then( m => m.InicioconductorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperarcontrasnia',
    loadChildren: () => import('./pages/recuperarcontrasnia/recuperarcontrasnia.module').then( m => m.RecuperarcontrasniaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registroconductor',
    loadChildren: () => import('./pages/registroconductor/registroconductor.module').then( m => m.RegistroconductorPageModule)
  },
  {
    path: 'servicio',
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule)
  },
  {
    path: 'servicioconductor',
    loadChildren: () => import('./pages/servicioconductor/servicioconductor.module').then( m => m.ServicioconductorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
