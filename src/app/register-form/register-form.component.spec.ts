import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { formatDate } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

import { RegisterFormComponent } from './register-form.component';

import { StudentLookupComponent } from '../student-lookup/student-lookup.component';
import { GenerateConfirmEmailComponent } from '../generate-confirm-email/generate-confirm-email.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedMaterialModule
      ],
      declarations: [ 
        RegisterFormComponent,
        StudentLookupComponent,
        GenerateConfirmEmailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
