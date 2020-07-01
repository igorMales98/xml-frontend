import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';
import {RentRequest} from '../model/rentRequest';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {FuelType} from '../model/fuelType';
import {TransmissionType} from '../model/transmissionType';
import {CarClass} from '../model/carClass';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAdvertisements() {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements');
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments/' + adId);
  }

  getBasicSearch(dateFrom: string, dateTo: string, place: string) {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements/basicSearch/'
      + dateFrom + '/' + dateTo + '/' + place);
  }

  createRentRequest(rentRequest: RentRequest) {
    return this.httpClient.post('https://localhost:8443/rent-request-service/api/rent-requests', rentRequest);
  }

  getAllCarBrands() {
    return this.httpClient.get<CarBrand[]>('https://localhost:8443/codebook-service/api/car-brands');
  }

  getCarBrandModels(id: string) {
    return this.httpClient.get<CarModel[]>('https://localhost:8443/codebook-service/api/car-models/' + id);
  }

  getAllFuelTypes() {
    return this.httpClient.get<FuelType[]>('https://localhost:8443/codebook-service/api/fuel-types');
  }

  getAllTransmissionTypes() {
    return this.httpClient.get<TransmissionType[]>('https://localhost:8443/codebook-service/api/transmission-types');
  }

  getAllCarClasses() {
    return this.httpClient.get<CarClass[]>('https://localhost:8443/codebook-service/api/car-classes');
  }

}
