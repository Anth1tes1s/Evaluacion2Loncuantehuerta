import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  // Asegúrate de que el nombre sea correcto
import { AuthService } from './core/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule) },
  { path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'recuperarcontrasnia', loadChildren: () => import('./pages/recuperarcontrasnia/recuperarcontrasnia.module').then(m => m.RecuperarContrasniaPageModule) },
  { path: 'loginconductor', loadChildren: () => import('./pages/loginconductor/loginconductor.module').then( m => m.LoginconductorPageModule)},
  { path: 'registroconductor', loadChildren: () => import('./pages/registroconductor/registroconductor.module').then( m => m.RegistroconductorPageModule)},
  { path: 'menuconductor', loadChildren: () => import('./pages/menuconductor/menuconductor.module').then( m => m.MenuconductorPageModule)},
  { path: 'iniciousuario', loadChildren: () => import('./pages/iniciousuario/iniciousuario.module').then(m => m.IniciousuarioPageModule) },
  { path: 'inicioconductor', canActivate: [AuthGuard], loadChildren: () => import('./pages/inicioconductor/inicioconductor.module').then(m => m.InicioconductorPageModule) },
  { path: 'servicio', loadChildren: () => import('./pages/servicio/servicio.module').then(m => m.ServicioPageModule) },
  { path: 'menu', canActivate: [AuthGuard], loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)},
  { path: '**', redirectTo: 'registro' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
