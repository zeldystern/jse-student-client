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
import { ComingSoonComponent } from './home/coming-soon/coming-soon.component';
import { UniqueUserNameValidatorDirective } from './validators/user-validation.directive';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SpinnerComponent } from './utils/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentLookupComponent,
    ConfirmEmailComponent,
    LoginCredentialsComponent,
    UniqueUserNameValidatorDirective,
    SpinnerComponent,
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
