import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();
  
  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('IngresoEgreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso( ingresoEgreso.items );
      });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach( item => {
      if (item.tipo === 'ingreso') {
        this.ingresos += item.monto;
        this.cuantosIngresos++;
      } else {
        this.egresos += item.monto;
        this.cuantosEgresos++;
      }
    });

    this.doughnutChartData = [ [this.ingresos, this.egresos] ];
  }

}
