import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeekFood';

  constructor(private apiService: ApiService) {
    this.apiService.getCarrusel()
      .subscribe((carrusel) => {
        console.log(carrusel);
      })
  }
}
