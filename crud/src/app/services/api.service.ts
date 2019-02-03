import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static API = `http://${ window.location.hostname }:${ environment.PUERTO_API }/api`;

  constructor(private http: HttpClient) {
    console.log('@@ ApiService // env', environment);
    console.log('@@ ApiService // API_AUTH', ApiService.API);
  }
  
  getCarrusel() {
    return this.http.get(`${ApiService.API}/carrusel`);
  }

  deleteTest() {
    return this.http.delete(`${ApiService.API}/test`);
  }
}
