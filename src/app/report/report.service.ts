import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { RentRequest } from '../model/rentRequest';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAllPaidRentRequests() {
    return this.httpClient.get<RentRequest[]>('https://localhost:8443/rent-request-service/api/rent-requests/allPaid');
  }

  createReport(report: Report){
    console.log(report);
    return this.httpClient.post('https://localhost:8443/rent-request-service/api/reports', report);
  }

  checkIfExist(requestId: String, carId: String){
    return this.httpClient.get<boolean>(`https://localhost:8443/rent-request-service/api/reports/${requestId}/${carId}`);
  }
}
