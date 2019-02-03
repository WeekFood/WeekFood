import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeekFood';

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.apiService.getCarrusel()
      .subscribe((carrusel) => {
        console.log('GET carrusel', carrusel);
      });

    this.apiService.deleteTest()
      .subscribe((res) => {
        console.log('DELETE test', res);
      });

    this.authService.postRegistro('juan', 'juan123')
      .subscribe((res) => {
        console.log('POST registro', res);
      });

    window.setTimeout(() => {
      this.authService.postLogin('juan', 'juan123')
        .subscribe((res) => {
          console.log('POST login', res);
        });
    }, 1000);
  }
}
