import {Rezervacija} from './rezervacija.model';

export interface Korisnik {
  id:number;
  username:string;
  password:string;
  userType:string;
  bookings: Rezervacija[];
  noviKolacic:number;


}
