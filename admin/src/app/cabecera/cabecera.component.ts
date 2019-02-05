import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  @Output() toggleSidebar = new EventEmitter();

  constructor() { }
}
