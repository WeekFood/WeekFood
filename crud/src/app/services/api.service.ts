import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getCarrusel() {
    const API = 'http://localhost:7272/api';

    return this.http.get(`${API}/carrusel`);
  }
}
