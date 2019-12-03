import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { dasboardRoutes } from './dasboard/dasboard.routes';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent  },
  {path: 'register', component: RegisterComponent  },
  {
    path: '',
    component: DasboardComponent,
    children: dasboardRoutes,
    canActivate: [ AuthGuard ]
  },
  {path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
