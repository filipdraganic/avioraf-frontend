import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RezervacijeComponent} from './rezervacije/rezervacije.component';
import {IzmenaKarataComponent} from './izmena-karata/izmena-karata.component';
import {AvioKompanijaComponent} from './avio-kompanija/avio-kompanija.component';
import {RegistracijaComponent} from './registracija/registracija.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PromenaSifreComponent} from './promena-sifre/promena-sifre.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"", component: HomeComponent,canActivate: [ AuthGuard ]},
  {path:"rezervacije", component: RezervacijeComponent, canActivate: [ AuthGuard ]},
  {path:"karta/:id", component: IzmenaKarataComponent, canActivate: [ AuthGuard ]},
  {path:"avio-kompanija/:id", component: AvioKompanijaComponent, canActivate: [ AuthGuard ]},
  {path:"registracija", component: RegistracijaComponent, canActivate: [ AuthGuard ]},
  {path:"login/promenaSifre", component:PromenaSifreComponent, canActivate: [ AuthGuard ]},
  {path:"**", component:NotFoundComponent, canActivate: [ AuthGuard ]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
