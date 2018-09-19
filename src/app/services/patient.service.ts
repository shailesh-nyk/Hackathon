import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';

@Injectable()
export class PatientService {
  constructor(
    private http: HttpClient,
    private apiRequest: ApiRequestService,
    private appConfig: AppConfig
  ) { }

  getPatientDetails(id: string): Observable<any>{
      return this.http.get(this.appConfig.baseApiPath + 'patient/fetch/' + id)
  }
  getPatientHistory(id: string, page , size): Observable<any>{
        return this.http.get(this.appConfig.baseApiPath + 'history/fetch',
        {
          params: new HttpParams()
              .set('id', id)
              .set('page', page)
              .set('size', size) 
         }
      ). map(res =>  res["histories"])
  }
  getMobileNumber(id: string): Observable<any> {
     return this.http.get(this.appConfig.baseApiPath + 'patient/contactNumber/' + id)
  }
  generateOTP(mobile: string): Observable<any> {
    return this.http.get('http://www.alcodes.com/ajax-product-phoneno-verification?countryCode=IN&mobileNo=' + mobile);
  }
  createHistory(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    return this.http.post(this.appConfig.baseApiPath + 'history/insert' , body, httpOptions);
  }
  getPrediction(symptoms: string) {
      let body = {
         "symptoms": symptoms
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      return this.http.post('http://172.26.41.252:5000/predict', body, httpOptions);
  }
}
