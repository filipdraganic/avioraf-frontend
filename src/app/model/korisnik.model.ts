import {Rezervacija} from './rezervacija.model';

export interface Korisnik {
  id:number;
  username:string;
  password:string;
  tipKorisnika:string;
  rezervacije: Rezervacija[];


}
