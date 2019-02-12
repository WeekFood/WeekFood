import { Component, OnInit } from '@angular/core';

import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categoriaActual: Categoria;
  categorias: Categoria[];

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getCategorias()
      .then((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }
}
