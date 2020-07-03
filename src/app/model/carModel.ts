import { CarBrand } from './carBrand';

export class CarModel {
  id: string;
  name: string;
  carBrand: CarBrand;

  constructor(name: string, carBrand: CarBrand){
          this.name = name;
          this.carBrand = carBrand;
  }

}
