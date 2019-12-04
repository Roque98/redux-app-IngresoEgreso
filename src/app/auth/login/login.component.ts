import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>
  ) { }

  ngOnInit(  ) {
    this.subscription = this.store.select('ui').
      subscribe( ui => {
        this.loading = ui.isLoading;
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(data: any) {
    this.authService.login( data.email, data.password );
  }

}
