import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarClass} from 'src/app/model/carClass';


@Injectable({
  providedIn: 'root'
})
export class CarClassService {

  constructor(private httpClient: HttpClient) {
  }

  createCarClass(newCarClassName: CarClass) {
    return this.httpClient.post('https://localhost:8443/codebook-service/api/car-classes', newCarClassName);
  }

  getAllCarClasses() {
    return this.httpClient.get<CarClass[]>('https://localhost:8443/codebook-service/api/car-classes');
  }

  deleteCarClass(id: number) {
    return this.httpClient.delete('https://localhost:8443/codebook-service/api/car-classes/' + id);
  }

  editCarClass(editedCarClass: CarClass) {
    return this.httpClient.put('https://localhost:8443/codebook-service/api/car-classes', editedCarClass);
  }
}
