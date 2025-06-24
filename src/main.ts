import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // import pour ttes devises/heures/... locales

platformBrowser().bootstrapModule(AppModule, {     // fichier démarrage: app.module est fichier de démarrage
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));

  registerLocaleData( localeFr, 'fr')
