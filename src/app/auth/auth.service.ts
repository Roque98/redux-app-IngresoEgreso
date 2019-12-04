import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as Firebase from 'firebase';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { SetUserAction } from './auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(
    private aFAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthService() {
    this.aFAuth.authState.subscribe( (fbUser: Firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe( (usuarioObj: any) =>  {
            const newUser = new User( usuarioObj );
            this.store.dispatch( new SetUserAction( newUser ) );
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.aFAuth.auth.
      createUserWithEmailAndPassword(email, password)
      .then( (resp: any) => {

        const user: User = {
          nombre,
          email: resp.user.email,
          uid: resp.user.uid
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch( new DesactivarLoadingAction() );

          });

      })
      .catch( (error) => {
        Swal.fire('Error en el login', error.message, 'error');
        this.store.dispatch( new DesactivarLoadingAction() );
      });

  }

  login( email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.aFAuth.auth.signInWithEmailAndPassword( email, password )
    .then( (resp: any) => {
      this.router.navigate(['/']);
      this.store.dispatch( new DesactivarLoadingAction() );

    })
    .catch( (error) => {
      Swal.fire('Error en el login', error.message, 'error');
      this.store.dispatch( new DesactivarLoadingAction() );
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.aFAuth.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.aFAuth.authState.
      pipe(
        map( fbUser => {
          if ( fbUser == null ) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        } )
      );
  }
}
