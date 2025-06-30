import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app/app.routes'; 

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([]) 
    ),
    ...appConfig.providers,
    provideRouter(routes),
    CookieService
  ]
});
