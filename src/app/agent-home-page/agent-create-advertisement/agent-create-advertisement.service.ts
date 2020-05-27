import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CarBrand} from '../../model/carBrand';
import {CarModel} from '../../model/carModel';
import {FuelType} from '../../model/fuelType';
import {TransmissionType} from '../../model/transmissionType';
import {CarClass} from '../../model/carClass';
import {Pricelist} from '../../model/pricelist';
import {CreateAdvertisements} from '../../model/createAdvertisements';

@Injectable({
  providedIn: 'root'
})
export class AgentCreateAdvertisementService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAllCarBrands() {
    return this.httpClient.get<CarBrand[]>('http://localhost:8082/api/car-brand/getAll');
  }

  getCarBrandModels(id: string) {
    return this.httpClient.get<CarModel[]>('http://localhost:8082/api/car-model/getBrandModels/' + id);
  }

  getAllFuelTypes() {
    return this.httpClient.get<FuelType[]>('http://localhost:8082/api/fuel-type/getAll');
  }

  getAllTransmissionTypes() {
    return this.httpClient.get<TransmissionType[]>('http://localhost:8082/api/transmission-type/getAll');
  }

  getAllCarClasses() {
    return this.httpClient.get<CarClass[]>('http://localhost:8082/api/car-class/getAll');
  }

  getAllPricelists() {
    return this.httpClient.get<Pricelist[]>('http://localhost:8082/api/pricelist/getAll');
  }

  createAdvertisement(selectedFiles, createAdvertisement: CreateAdvertisements) {

    return this.httpClient.post('http://localhost:8082/api/advertisement/create', createAdvertisement).subscribe(data => {
      const uploadData = new FormData();

      for (let blob of selectedFiles) {
        uploadData.append('myFile', blob, blob.name);
      }

      this.httpClient.post('http://localhost:8082/api/advertisement/uploadPhotos/' + data, uploadData).subscribe();

    });
  }
}
