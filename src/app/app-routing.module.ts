import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RegisterFormComponent } from './register-form/register-form.component';
import { StudentLookupComponent } from './student-lookup/student-lookup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { GenerateConfirmEmailComponent } from './generate-confirm-email/generate-confirm-email.component';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterFormComponent,
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
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
