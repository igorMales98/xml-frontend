import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pricelist} from '../model/pricelist';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private httpClient: HttpClient) {
  }

  createPricelist(newPrice: Pricelist) {
    return this.httpClient.post('https://localhost:8443/codebook-service/api/pricelists', newPrice);
  }

  getAllPricelists() {
    return this.httpClient.get<Pricelist[]>('https://localhost:8443/codebook-service/api/pricelists');
  }

  deletePricelist(id: number) {
    return this.httpClient.delete('https://localhost:8443/codebook-service/api/pricelists/' + id);
  }

  editPricelist(editedPricelist: Pricelist) {
    return this.httpClient.put('https://localhost:8443/codebook-service/api/pricelists', editedPricelist);
  }
}
