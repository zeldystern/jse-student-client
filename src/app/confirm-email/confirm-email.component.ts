import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

import { SUCCESS_MSG, ERROR_MSG } from '../services/strings';

@Component({
  selector: 'confirm-email-component',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  
  public confirmEmailError: string;
  public confirmEmailSuccess: string;
  public loading: boolean;
  public student_id: number;
  public token: string;

  constructor(private router: Router, private route: ActivatedRoute, private _studentService: StudentService) { }

  ngOnInit() {
    this.student_id = +this.route.snapshot.paramMap.get("student_id");
    this.token = this.route.snapshot.paramMap.get("token");
    this.confirmEmailError = '';
    this.confirmEmailSuccess = '';
    this.loading = true;
    this._studentService.confirmToken(this.student_id, this.token).subscribe(
			response => {
                if (response.error) {
                  this.confirmEmailError = response.error+' '+ERROR_MSG.signup_again;
                }
                if (response.success) {
                  this.confirmEmailSuccess = response.success;  
                  this.router.navigate(['login-credentials','student_id', this.student_id ]);      
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.confirmEmailError = ERROR_MSG.error_confirm_email+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }

}
