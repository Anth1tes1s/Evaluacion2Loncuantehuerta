import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './core/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio', // Página de inicio predeterminada
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'recuperarcontrasnia',
    loadChildren: () => import('./pages/recuperarcontrasnia/recuperarcontrasnia.module').then(m => m.RecuperarContrasniaPageModule)
  },
  {
    path: 'iniciousuario',
    providers: [AuthService],
    canMatch: [authGuard],
    loadChildren: () => import('./pages/iniciousuario/iniciousuario.module').then(m => m.IniciousuarioPageModule)
  },
  {
    path: 'registroconductor',
    providers: [AuthService],
    canActivate: [authGuard],
    loadChildren: () => import('./pages/registroconductor/registroconductor.module').then(m => m.RegistroconductorPageModule)
  },
  {
    path: 'inicioconductor',
    providers: [AuthService],
    canActivate: [authGuard],
    loadChildren: () => import('./pages/inicioconductor/inicioconductor.module').then(m => m.InicioconductorPageModule)
  },
  {
    path: 'servicio',
    providers: [AuthService],
    canActivate: [authGuard],
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule)
  }, 
  {
    path: 'servicioconductor',
    providers: [AuthService],
    canActivate: [authGuard],
    loadChildren: () => import('./pages/servicioconductor/servicioconductor.module').then( m => m.ServicioconductorPageModule)
  },
  { path: '**', redirectTo: 'registro' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
