import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
