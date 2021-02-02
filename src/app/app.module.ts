import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TabelaKarataComponent } from './tabela-karata/tabela-karata.component';
import { IzmenaKarataComponent } from './izmena-karata/izmena-karata.component';
import { AvioKompanijaComponent } from './avio-kompanija/avio-kompanija.component';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TabelaKarataComponent,
    IzmenaKarataComponent,
    AvioKompanijaComponent,
    RezervacijeComponent,
    NotFoundComponent,
    RegistracijaComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatPaginatorModule
  ],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
