import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class AccountConfirmationService {

  constructor(private httpClient: HttpClient) {
  }

  confirmAcount(url: string) {
    this.httpClient.put<any>(url, any).subscribe();
  }

}
