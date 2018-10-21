import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { StudentLookupComponent } from '../student-lookup/student-lookup.component';
import { GenerateConfirmEmailComponent } from '../generate-confirm-email/generate-confirm-email.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
  }
  
  processForm() {}
  
  @ViewChild(StudentLookupComponent) studentLookupComponent: StudentLookupComponent;
  @ViewChild(GenerateConfirmEmailComponent) generateConfirmEmailComponent: GenerateConfirmEmailComponent;

    get studentLookupForm() {
       return this.studentLookupComponent ? this.studentLookupComponent.studentLookupForm : null;
    }

    get generateConfirmEmailForm() {
       return this.generateConfirmEmailComponent ? this.generateConfirmEmailComponent.generateConfirmEmailForm : null;
    }
}
