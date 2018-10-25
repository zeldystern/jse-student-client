import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

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
    this.loading = true;
    this._studentService.confirmToken(this.student_id, this.token).subscribe(
			response => {
                if (response.error) {
                  this.confirmEmailError = response.error;
                }
                if (response.success) {
                  this.confirmEmailSuccess = response.success;  
                  setTimeout(() => {
                    this.router.navigate(['login-credentials','student_id', this.student_id ]);
                  }, 3000);      
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.loading = false;
			}
		);
  }

}
