import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nameUser: string;
  subscription: Subscription = new Subscription( );

  constructor(
    public authService: AuthService,
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user !== null )
    )
    .subscribe( data => {
      this.nameUser = data.user.nombre;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
