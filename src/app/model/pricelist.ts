export class Pricelist {
  id: string;
  pricePerDay: string;
  pricePerKm: string;
  priceForCDW: string;

  constructor(id: string, pricePerDay: string, pricePerKm: string, priceForCDW){
    this.id = id;
    this.pricePerDay = pricePerDay;
    this.pricePerKm = pricePerKm;
    this.priceForCDW = priceForCDW;
  }
}
