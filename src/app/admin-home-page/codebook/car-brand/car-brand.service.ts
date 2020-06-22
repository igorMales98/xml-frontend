import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CarBrand } from 'src/app/model/carBrand';


@Injectable({
    providedIn: 'root'
})
export class CarBrandService {

    constructor(private httpClient: HttpClient) {
    }

    createCarBrand(newCarBrandName: CarBrand) {
        return this.httpClient.post('https://localhost:8443/codebook-service/api/car-brand/addCarBrand', newCarBrandName);
    }

    getAllCarBrands() {
        return this.httpClient.get<CarBrand[]>('https://localhost:8443/codebook-service/api/car-brands');
    }

    deleteCarBrand(id: number) {
        return this.httpClient.delete('https://localhost:8443/codebook-service/api/car-brands/deleteCarBrand/' + id);
    }

    editCarBrand(editedCarBrand: CarBrand){
        return this.httpClient.put('https://localhost:8443/codebook-service/api/car-brands/editCarBrand', editedCarBrand);
    }
}
