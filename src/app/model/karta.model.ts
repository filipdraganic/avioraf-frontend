import {AvioKompanija} from './avio-kompanija.model';
import {Let} from './let.model';

export interface Karta {
  id: number;
  avionskaKompanija:AvioKompanija;
  oneway: boolean;
  departDate: Date;
  returnDate: Date;
  let: Let;
  count: number;
}
