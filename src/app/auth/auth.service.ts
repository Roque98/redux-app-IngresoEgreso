import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as Firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private aFAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) { }

  initAuthService() {
    this.aFAuth.authState.subscribe( (fbUser: Firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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
          });

      })
      .catch( (error) => {
        Swal.fire('Error en el login', error.message, 'error');
      });

  }

  login( email: string, password: string ) {
    this.aFAuth.auth.signInWithEmailAndPassword( email, password )
    .then( (resp: any) => {
      this.router.navigate(['/']);
    })
    .catch( (error) => {
      Swal.fire('Error en el login', error.message, 'error');
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
