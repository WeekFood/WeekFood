import { Component, OnInit } from '@angular/core';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss']
})
export class SubcategoriasComponent implements OnInit {

  constructor(private subcategoriasService: SubcategoriasService) { }

  ngOnInit() {
    this.subcategoriasService.getSubcategorias()
      .then(subcategorias => console.log(subcategorias));
  }

}
