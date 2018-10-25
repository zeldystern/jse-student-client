import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { ERROR_CODES } from '../services/error_codes';

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
  public sendConfirmEmailError: string;
  public sendConfirmEmailSuccess: string;
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
    this.formattedDOB = formatDate(this.dob.value, 'MM/dd/yyyy', 'en-US');
    this._studentService.findStudent(this.formattedDOB, this.ssn.value, this.email.value).subscribe(
			response => {
                if (response.error) {
                  this.studentLookupError = response.error;
                  this.studentLookupErrorCode = response.error_code;
                  if (this.studentLookupErrorCode == ERROR_CODES.student_not_found) {
                    this.studentLookupError = "We were unable to locate your JSE account. Please call the JSE office at xxx-xxx-xxxx between 9-4, Mon-Thurs.";
                  }
                  this.loading = false;
                }
                if (response.student_id) {
                  this._studentService.updateStudent(new Student(response.student_id, 0, 
                                                                 response.first_name, response.last_name,
                                                                 response.email,'',''));   
                  this.studentLookupSuccess = "Indentified. Sending confirmation email.";
                  this.sendConfirmationEmail();      
                }
			},
			error =>{
				console.log(<any>error);
                this.loading = false;
			}
		);
  }
  
  sendConfirmationEmail() {
    this.loading = true;
    this._studentService.sendConfirmationEmail(this.student.id, this.email.value).subscribe(
			response => {
                if (response.error) {
                  this.sendConfirmEmailError = response.error;
                }
                else {
                  this.sendConfirmEmailSuccess = response.success;
                }
                this.studentLookupSuccess = '';
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.studentLookupSuccess = '';
                this.loading = false;
			}
		);
  }
  
  get dob() { return this.studentLookupForm.get('dob'); }
  get ssn() { return this.studentLookupForm.get('ssn'); }
  get email() { return this.studentLookupForm.get('email'); }
  get validStudent() { return this.studentLookupForm.get('validStudent'); }
}
