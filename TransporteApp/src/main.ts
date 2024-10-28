import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// import { defineCustomElements } from '@ionic/pwa-elements/loader'; // Solo si necesitas PWA elements

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Si decides mantener defineCustomElements
// defineCustomElements(window);
