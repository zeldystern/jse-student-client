import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StudentLookupComponent } from './student-lookup/student-lookup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './home/coming-soon/coming-soon.component';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'home/student_id/:student_id',
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'register',
    component: StudentLookupComponent,
  },
  {
    path: 'confirm-email/student_id/:student_id/token/:token',
    component: ConfirmEmailComponent, 
  },
  {
    path: 'login-credentials/student_id/:student_id',
    component: LoginCredentialsComponent, 
  },
  {
    path: 'reset-password/student_id/:student_id/user_name/:user_name/token/:token',
    component: ResetPasswordComponent, 
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
