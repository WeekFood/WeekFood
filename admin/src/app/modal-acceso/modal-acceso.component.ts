import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-modal-acceso',
  templateUrl: './modal-acceso.component.html',
  styleUrls: ['./modal-acceso.component.scss']
})
export class ModalAccesoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $(".js-modal-acceso").modal()
  }
}
