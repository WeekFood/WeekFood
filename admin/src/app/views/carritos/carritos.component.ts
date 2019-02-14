import { Component, OnInit } from '@angular/core';

import { CarritosService } from 'src/app/services/carritos.service';
import { Carrito } from 'src/app/models/Carrito';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss']
})
export class CarritosComponent implements OnInit {
  carritos: Carrito[];

  constructor(private carritosService: CarritosService) { }

  ngOnInit() {
    this.getCarritos();
  }

  getCarritos() {
    this.carritosService.getCarritos()
      .then((carritos: Carrito[]) => {
        this.carritos = carritos;
      });
  }
}
