import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TransmissionType } from 'src/app/model/transmissionType';

@Injectable({
    providedIn: 'root'
})
export class TransmissionTypeService {

    constructor(private httpClient: HttpClient) {
    }

    createTransmissionType(newTransmissionTypeName: TransmissionType) {
        return this.httpClient.post('https://localhost:8443/codebook-service/api/transmission-type/addFuelType', newTransmissionTypeName);
    }

    getAllTransmissionTypes() {
        return this.httpClient.get<TransmissionType[]>('https://localhost:8443/codebook-service/api/transmission-type/all');
    }

    deleteTransmissionType(id: number) {
        return this.httpClient.delete('https://localhost:8443/codebook-service/api/transmission-type/deleteTransmissionType/' + id);
    }

    editTransmissionType(editedTransmissionType: TransmissionType){
        return this.httpClient.put('https://localhost:8443/codebook-service/api/transmission-type/editTransmissionType', editedTransmissionType);
    }
}
