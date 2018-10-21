import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'generate-confirm-email-component',
  templateUrl: './generate-confirm-email.component.html',
  styleUrls: ['./generate-confirm-email.component.scss']
})
export class GenerateConfirmEmailComponent implements OnInit {

  public student: Student;
  public generateConfirmEmailForm: FormGroup; 
  public generateConfirmEmailError: string; 
  public confirmationEmailSentMessage: string;
  public loading: boolean;
  
  constructor(private formBuilder: FormBuilder, private _studentService: StudentService){
		this.generateConfirmEmailForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, 
                                          Validators.email])]
        },
        { updateOn: 'blur' }
        );
  }

  ngOnInit() {
    this._studentService.student.subscribe(student => this.student = student);
  }
  
  onSubmit() {
    this.resetMessages();
    this.loading = true;
    this._studentService.sendConfirmationEmail(this.student.id, this.email.value).subscribe(
			response => {
                if (response.error) {
                  this.generateConfirmEmailError = response.error;
                }
                else {
                  this.confirmationEmailSentMessage = response.success;
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.loading = false;
			}
		);
  }
  
  private resetMessages() {
    this.generateConfirmEmailError = '';
    this.confirmationEmailSentMessage = '';
  }
  
  get email() { return this.generateConfirmEmailForm.get('email'); }

}
