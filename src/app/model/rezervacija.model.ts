import {Let} from './let.model';
import {Karta} from './karta.model';

export interface Rezervacija {
  id:number;
  isAvailable: boolean;
  flight: Let;
  avionskaKarta: Karta;
}
