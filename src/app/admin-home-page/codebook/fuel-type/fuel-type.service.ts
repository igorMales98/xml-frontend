import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FuelType } from 'src/app/model/fuelType';

@Injectable({
    providedIn: 'root'
})
export class FuelTypeService {

    constructor(private httpClient: HttpClient) {
    }

    createFuelType(newFuelTypeName: FuelType) {
        return this.httpClient.post('https://localhost:8443/codebook-service/api/fuel-type/addFuelType', newFuelTypeName);
    }

    getAllFuelTypes() {
        return this.httpClient.get<FuelType[]>('https://localhost:8443/codebook-service/api/fuel-type/all');
    }

    deleteFuelType(id: number) {
        return this.httpClient.delete('https://localhost:8443/codebook-service/api/fuel-type/deleteFuelType/' + id);
    }

    editFuelType(editedFuelType: FuelType){
        return this.httpClient.put('https://localhost:8443/codebook-service/api/fuel-type/editFuelType', editedFuelType);
    }
}
