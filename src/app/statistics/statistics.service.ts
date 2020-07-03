import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) {
  }

  getCarsForRatingStatistics(id: string) {
    return this.httpClient.get<Car[]>('https://localhost:8443/advertisement-service/api/cars/' + id);
  }
}
