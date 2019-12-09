import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nameUser: string;
  subscription: Subscription = new Subscription( );
  
  constructor(
    private store: Store<AppState>
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

}
