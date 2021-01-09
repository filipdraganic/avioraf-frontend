import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RezervacijeComponent} from './rezervacije/rezervacije.component';
import {IzmenaKarataComponent} from './izmena-karata/izmena-karata.component';
import {AvioKompanijaComponent} from './avio-kompanija/avio-kompanija.component';
import {RegistracijaComponent} from './registracija/registracija.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"rezervacije", component: RezervacijeComponent},
  {path:"izmena-karata/:id", component: IzmenaKarataComponent},
  {path:"avio-kompanija/:id", component: AvioKompanijaComponent},
  {path:"registracija", component: RegistracijaComponent},
  {path:"**", component:NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
