import {CarModel} from './carModel';
import {CarClass} from './carClass';
import {CarBrand} from './carBrand';
import {FuelType} from './fuelType';
import {TransmissionType} from './transmissionType';

export class Car {
  id: string;
  carBrand: CarBrand;
  carModel: CarModel;
  carClass: CarClass;
  fuelType: FuelType;
  transmissionType: TransmissionType;
  allowedDistance: number;
  averageRating: number;
  childSeats: number;
  collisionDamageWaiverExists: boolean;
  hasAndroid: boolean;
  mileage: number;

  // helper fields
  timesRented: number;
  rentMileage: number;
}
