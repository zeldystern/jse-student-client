import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

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
  public loading: boolean;

  constructor(private formBuilder: FormBuilder, private _studentService: StudentService){
		this.studentLookupForm = this.formBuilder.group({
          dob: ['', Validators.compose([Validators.required])],
          ssn: ['', Validators.compose([Validators.required, 
                                        Validators.pattern('[0-9]{4}')])],
          validStudent: ['', Validators.compose([Validators.required])]                              
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
    if (this.student) { console.log('student already found'); return; }
    this.loading = true;
    this.studentLookupError = '';
    this.formattedDOB = formatDate(this.dob.value, 'MM/dd/yyyy', 'en-US');
    this._studentService.findStudent(this.formattedDOB, this.ssn.value).subscribe(
			response => {
                if (response.error) {
                  this.studentLookupError = response.error;
                }
                if (response.student_id) {
                  this._studentService.updateStudent(new Student(response.student_id, 0, 
                                                                 response.first_name, response.last_name,
                                                                 '','',''));  
                  this.validStudent.setValue('true');       
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.loading = false;
			}
		);
  }
  
  get dob() { return this.studentLookupForm.get('dob'); }
  get ssn() { return this.studentLookupForm.get('ssn'); }
  get validStudent() { return this.studentLookupForm.get('validStudent'); }
}
