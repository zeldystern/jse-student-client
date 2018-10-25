import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { UniqueUserNameValidator } from '../validators/user-validation.directive';
import { PasswordValidation } from '../validators/password-validation';
import { StudentService } from '../services/student.service';

import { LoginCredentialsComponent } from './login-credentials.component';

fdescribe('LoginCredentialsComponent', () => {
  let component: LoginCredentialsComponent;
  let fixture: ComponentFixture<LoginCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCredentialsComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedMaterialModule
      ],
      providers: [ StudentService, PasswordValidation, UniqueUserNameValidator ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
