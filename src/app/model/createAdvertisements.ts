import {CarBrand} from './carBrand';
import {CarModel} from './carModel';
import {CarClass} from './carClass';
import {FuelType} from './fuelType';
import {TransmissionType} from './transmissionType';
import {Pricelist} from './pricelist';

export class CreateAdvertisements {
  carBrand: CarBrand;
  carModel: CarModel;
  carClass: CarClass;
  fuelType: FuelType;
  transmissionType: TransmissionType;
  pricelist: Pricelist;
  availableFrom: Date;
  availableTo: Date;
  mileage: number;
  childSeats: number;
  hasACDW: boolean;
  allowedDistance: number;
  discount: string;

  constructor(carBrand: CarBrand, carModel: CarModel, carClass: CarClass, fuelType: FuelType, transmissionType: TransmissionType,
              pricelist: Pricelist, availableFrom: Date, availableTo: Date, mileage: number, childSeats: number, hasACDW: boolean,
              allowedDistance: number, discount: string) {
    this.carBrand = carBrand;
    this.carModel = carModel;
    this.carClass = carClass;
    this.fuelType = fuelType;
    this.transmissionType = transmissionType;
    this.pricelist = pricelist;
    this.availableFrom = availableFrom;
    this.availableTo = availableTo;
    this.mileage = mileage;
    this.childSeats = childSeats;
    this.hasACDW = hasACDW;
    this.allowedDistance = allowedDistance;
    this.discount = discount;
  }
}
