import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { ERROR_CODES } from '../services/error_codes';
import { SUCCESS_MSG, ERROR_MSG } from '../services/strings';

@Component({
  selector: 'student-lookup-component',
  templateUrl: './student-lookup.component.html',
  styleUrls: ['./student-lookup.component.scss']
})
export class StudentLookupComponent implements OnInit {
  
  public studentLookupForm: FormGroup; 
  private formattedDOB: string;
  public student: Student;
  public studentLookupError: string;
  public studentLookupErrorCode: number;
  public studentLookupSuccess: string;
  public loading: boolean;

  constructor(private formBuilder: FormBuilder, private _studentService: StudentService){
		this.studentLookupForm = this.formBuilder.group({
          dob: ['', Validators.compose([Validators.required])],
          ssn: ['', Validators.compose([Validators.required, 
                                        Validators.pattern('[0-9]{4}')])],
          email: ['', Validators.compose([Validators.required, Validators.email])]                              
        },
        { updateOn: 'blur' }
        );
  }
  
  

  ngOnInit() {
    this._studentService.student.subscribe(student => this.student = student);
    this.studentLookupForm.valueChanges.subscribe(  
      (form: any) => {  
        this.studentLookupError = ''; 
      }
    );
  }
  
  onSubmit() {
    //if (this.student) { console.log('student already found'); return; }
    this.loading = true;
    this.studentLookupError = '';
    this.studentLookupSuccess = '';
    this.formattedDOB = formatDate(this.dob.value, 'MM/dd/yyyy', 'en-US');
    this._studentService.sendSignupConfirmationEmail(this.formattedDOB, this.ssn.value, this.email.value).subscribe(
			response => {
                if (response.error) {
                  this.studentLookupError = response.error;
                  this.studentLookupErrorCode = response.error_code;
                  switch (this.studentLookupErrorCode) {
                    case ERROR_CODES.student_not_found:
                      this.studentLookupError = ERROR_MSG.cannot_locate_account+' '+ERROR_MSG.contact_jse;
                    break;
                    case ERROR_CODES.too_many_records_found:
                      this.studentLookupError = ERROR_MSG.too_many_records+' '+ERROR_MSG.contact_jse;
                    break;
                  }
                }
                if (response.success) {
                  this.studentLookupSuccess = response.success;    
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.studentLookupError = ERROR_MSG.error_locate_account+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }
  
  get dob() { return this.studentLookupForm.get('dob'); }
  get ssn() { return this.studentLookupForm.get('ssn'); }
  get email() { return this.studentLookupForm.get('email'); }
}
