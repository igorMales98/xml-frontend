import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {FuelType} from '../model/fuelType';
import {TransmissionType} from '../model/transmissionType';
import {CarClass} from '../model/carClass';
import {Pricelist} from '../model/pricelist';
import {CreateAdvertisements} from '../model/createAdvertisements';

@Injectable({
  providedIn: 'root'
})
export class CreateAdvertisementService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAllCarBrands() {
    return this.httpClient.get<CarBrand[]>('https://localhost:8443/codebook-service/api/car-brand/all');
  }

  getCarBrandModels(id: string) {
    return this.httpClient.get<CarModel[]>('https://localhost:8443/codebook-service/api/car-model/brand/' + id);
  }

  getAllFuelTypes() {
    return this.httpClient.get<FuelType[]>('https://localhost:8443/codebook-service/api/fuel-type/all');
  }

  getAllTransmissionTypes() {
    return this.httpClient.get<TransmissionType[]>('https://localhost:8443/codebook-service/api/transmission-type/all');
  }

  getAllCarClasses() {
    return this.httpClient.get<CarClass[]>('https://localhost:8443/codebook-service/api/car-class/all');
  }

  getAllPricelists() {
    return this.httpClient.get<Pricelist[]>('https://localhost:8443/codebook-service/api/pricelist/all');
  }

  createAdvertisement(selectedFiles, createAdvertisement: CreateAdvertisements) {

    return this.httpClient.post('https://localhost:8443/advertisement-service/api/advertisement', createAdvertisement).subscribe(data => {
      const uploadData = new FormData();

      for (let blob of selectedFiles) {
        uploadData.append('myFile', blob, blob.name);
      }

      this.httpClient.post('https://localhost:8443/advertisement-service/api/advertisement/uploadPhotos/' + data, uploadData).subscribe();

    });
  }
}
