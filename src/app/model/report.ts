import {RentRequest} from './rentRequest';
import {Car} from './car';

export class Report {
  id: string;
  car: Car;
  km: number;
  additionalInformation: string;
  rentRequest: RentRequest;

  constructor(car: Car, km: number, additionalInformation: string, request: RentRequest) {
    this.car = car;
    this.km = km;
    this.additionalInformation = additionalInformation;
    this.rentRequest = request;
  }
}
