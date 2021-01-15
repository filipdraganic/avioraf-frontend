import {Karta} from './karta.model';
import {Grad} from './grad.model';

export interface Let {
  id:number;
  origin: Grad;
  destination: Grad;
}
