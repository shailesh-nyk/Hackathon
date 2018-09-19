import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//PAGES
import { MainComponent   } from './main.component';
import { HomeComponent } from '../app/pages/home/home.component'

//COMPONENTS
import { HeaderComponent } from '../app/components/header/header.component';
import { SpinnerComponent } from '../app/components/spinner/spinner.component';
import { MedicalHistoryComponent } from '../app/components/medical-history/medical-history.component';
import { OTPComponent } from '../app/components/otp/otp.component' ;
//SERVICES
import { ApiRequestService} from './services/api-request.service';
import { AppConfig } from './app-config';
import { AppComponent } from './app.component';
import { PatientService } from './services/patient.service'

const routes: Routes = [
  //Important: The sequence of path is important as the router go over then in sequential manner
  { path: '', redirectTo: '/ui/home', pathMatch: 'full'},
  {
    path: 'ui',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    SpinnerComponent,
    MedicalHistoryComponent,
    OTPComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule 
  ],
  providers: [
    ApiRequestService,
    AppConfig,
    PatientService
  ],
  entryComponents: [
    MedicalHistoryComponent,
    OTPComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
