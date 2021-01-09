import {Karta} from './karta.model';
import {Grad} from './grad.model';

export interface Let {
  id:number;
  karta: Karta[];
  origin: Grad;
  destination: Grad;
}
