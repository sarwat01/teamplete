import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharedService/navbar/navbar.component';
import { PaiginateComponent } from './sharedService/paiginate/paiginate.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AuthGuard} from './services/guards/auth.guard'
import {AuthService} from './services/services/auth.service'
import {RandomGuard} from './services/guards/random.guard'
import {RestApiService} from './services/shared.services'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaiginateComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    AuthService,
     RandomGuard,
      RestApiService, 
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
