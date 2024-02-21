import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
// import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { customInterceptor } from './custom.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { dashboardReducer } from './store/user.reducer';
// import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([HttpClientModule]), 
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withInterceptors([customInterceptor])), provideAnimationsAsync(),
    provideStore(),
     provideState({name:'dashboard',reducer:dashboardReducer})
  ]
};
