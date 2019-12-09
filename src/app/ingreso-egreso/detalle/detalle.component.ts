import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subcription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.subcription = this.store.select('IngresoEgreso')
      .subscribe( ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  borrarItem(uidItem: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uidItem);
  }

  alertaEliminar(uidItem: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.borrarItem(uidItem);
        Swal.fire(
          'Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        );
      }
    })
  }

}
