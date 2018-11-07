import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../validators/password-validation';
import { StudentService } from '../services/student.service';
import { SUCCESS_MSG, ERROR_MSG, PAGE_TEXT } from '../services/strings';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  public student_id: number;
  public user_name: string;
  public resetPasswordError: string;
  public resetPasswordSuccess: string;
  public resetPasswordInstructions: string;
  public userToken: string;
  public loading: boolean;

  resetPasswordForm = this.formBuilder.group({
    passwordGroup: this.formBuilder.group({
      password: ['', {validators: [Validators.required, Validators.minLength(8)],updateOn:'blur'}],
      confirmPassword: ['', {validators: [Validators.required]}]
    }, {
      validator: PasswordValidation.MatchPassword, updateOn:'blur'
    })
  },
  { updateOn: 'blur' }
 );
 
  ngOnInit() {
    this.student_id = +this.route.snapshot.paramMap.get("student_id");
    this.user_name = this.route.snapshot.paramMap.get("user_name");
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('login credentials form',this.student_id);
    this.loading = true;
    this.resetPasswordError = '';
    this.resetPasswordSuccess = '';
    this._studentService.saveLoginCredentials(
      this.student_id, 
      this.user_name, 
      this.password.value).subscribe(
			response => {
				if(response.error){
					this.resetPasswordError = response.error;
                    this.loading = false;
				}
                else {
                  this.resetPasswordSuccess = response.success;
                  this.loading = false;
                  this.userToken = JSON.stringify(response.success);
                  localStorage.setItem('userToken', this.userToken);  
                  setTimeout(() => {
                    this.router.navigate(['home'],{
                      queryParams: {
                        'student_id':response.success.student_id,
                        'userToken':this.userToken
                      }
                    })
                  }, 3000); 
                }
                
			},
			error =>{
				console.log(<any>error);
                this.resetPasswordError = ERROR_MSG.error_saving_credentials+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }
  
  get password() { return this.resetPasswordForm.get('passwordGroup').get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('passwordGroup').get('confirmPassword'); }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private _studentService: StudentService){}

}
