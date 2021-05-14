import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  teacherData: any;
  teacherDataJSON : any;
  

  constructor(private httpClient: HttpClient) { }

  register(data: any) {
    this.teacherDataJSON = JSON.stringify(this.teacherData);
    data = this.teacherDataJSON;
    // const options = 
    return this.httpClient.post(`${environment.apiUrl}teachers`, data);
  }
}
