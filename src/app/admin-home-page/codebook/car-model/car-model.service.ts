import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarModel} from 'src/app/model/carModel';
import { CarBrand } from 'src/app/model/carBrand';


@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(private httpClient: HttpClient) {
  }

  createCarModel(newCarModelName: CarModel) {
    return this.httpClient.post('https://localhost:8443/codebook-service/api/car-models', newCarModelName);
  }

  getAllCarModels() {
    return this.httpClient.get<CarModel[]>('https://localhost:8443/codebook-service/api/car-models');
  }

  deleteCarModel(id: string) {
    return this.httpClient.delete('https://localhost:8443/codebook-service/api/car-models/' + id);
  }

  editCarModel(editedCarModel: CarModel) {
    return this.httpClient.put('https://localhost:8443/codebook-service/api/car-models', editedCarModel);
  }

  getAllCarBrands() {
    return this.httpClient.get<CarBrand[]>('https://localhost:8443/codebook-service/api/car-brands');
  }

  getBrandModels(id: string) {
    return this.httpClient.get<CarModel[]>('https://localhost:8443/codebook-service/api/car-models/'+id);
  }
}
