import { Component, OnInit } from '@angular/core';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { Subcategoria } from 'src/app/models/Subcategoria';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss']
})
export class SubcategoriasComponent implements OnInit {
  subcategorias: Subcategoria[];

  constructor(private subcategoriasService: SubcategoriasService) { }

  ngOnInit() {
    this.getSubcategorias();
  }

  getSubcategorias() {
    this.subcategoriasService.getSubcategorias()
      .then((subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
      });
  }

}
