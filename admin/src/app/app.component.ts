import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarVisible: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.login('juan', 'juan123')
      .subscribe((res) => {
        console.log('POST login', res);
      }, (res) => {
        console.error('ERROR login', res);
      });
  }
}
