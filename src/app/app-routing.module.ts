import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StudentLookupComponent } from './student-lookup/student-lookup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { ComingSoonComponent } from './home/coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: 'home',
    component: ComingSoonComponent, 
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
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ComingSoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
