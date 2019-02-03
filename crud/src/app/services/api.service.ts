import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static API = 'http://localhost:7272/api';

  constructor(private http: HttpClient) { }
  
  getCarrusel() {
    return this.http.get(`${ApiService.API}/carrusel`);
  }

  deleteTest() {
    return this.http.delete(`${ApiService.API}/test`);
  }
}
