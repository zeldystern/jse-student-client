import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatProgressSpinnerModule } from '@angular/material';
import { StudentLookupComponent } from './student-lookup/student-lookup.component';
import { GenerateConfirmEmailComponent } from './generate-confirm-email/generate-confirm-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RegisterFormComponent,
        StudentLookupComponent,
        GenerateConfirmEmailComponent,
        ConfirmEmailComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        MatStepperModule,
        MatProgressSpinnerModule 
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
