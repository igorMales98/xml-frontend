import {User} from './user';
import {Advertisement} from './advertisement';
import {Report} from './report';

export class RentRequest {
  id: string;
  reservedFrom: string;
  reservedTo: string;
  customer: User;
  advertisementsForRent: Advertisement[] = [];
  reports: Report[] = [];
  bundle: boolean;
  physicalRent: boolean;

  constructor(reservedFrom: string, reservedTo: string, customer: User, advertisementsForRent: Advertisement[], bundle: boolean,
              physicalRent: boolean) {
    this.reservedFrom = reservedFrom;
    this.reservedTo = reservedTo;
    this.customer = customer;
    this.advertisementsForRent = advertisementsForRent;
    this.bundle = bundle;
    this.physicalRent = physicalRent;
  }
}
