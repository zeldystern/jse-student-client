import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { StudentLookupComponent } from './student-lookup/student-lookup.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { UniqueUserNameValidatorDirective } from './validators/user-validation.directive';
import { SpinnerComponent } from './utils/spinner/spinner.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentLookupComponent,
    ConfirmEmailComponent,
    LoginCredentialsComponent,
    UniqueUserNameValidatorDirective,
    SpinnerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HomeModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
