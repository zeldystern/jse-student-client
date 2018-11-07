import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UniqueUserNameValidator } from '../validators/user-validation.directive';
import { PasswordValidation } from '../validators/password-validation';
import { StudentService } from '../services/student.service';
import { SUCCESS_MSG, ERROR_MSG, PAGE_TEXT } from '../services/strings';

@Component({
  selector: 'login-credentials-app',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.scss']
})
export class LoginCredentialsComponent implements OnInit {

  public student_id: number;
  public loginCredentialsError: string;
  public loginCredentialsSuccess: string;
  public loginCredentialsInstructions: string;
  public userToken: string;
  public loading: boolean;
  
  loginCredentialsForm = this.formBuilder.group({
    userName: ['',{validators: [Validators.required, Validators.minLength(6), Validators.pattern('^[^#.,?=&]*$')] ,asyncValidators: [this.uniqueUserNameValidator.validate.bind(this.uniqueUserNameValidator)], updateOn:'blur'}],
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
    this.loginCredentialsInstructions = PAGE_TEXT.login_credentials_instructions;
    
    this.loginCredentialsForm.valueChanges.subscribe(  
      (form: any) => {  
        this.loginCredentialsError = ''; 
        this.loginCredentialsSuccess = ''; 
      }
    );
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('login credentials form',this.student_id);
    this.loading = true;
    this.loginCredentialsError = '';
    this.loginCredentialsSuccess = '';
    this._studentService.saveLoginCredentials(
      this.student_id, 
      this.userName.value, 
      this.password.value).subscribe(
			response => {
				if(response.error){
					this.loginCredentialsError = response.error;
                    this.loading = false;
				}
                else {
                  this.loginCredentialsSuccess = response.success;
                  this.userToken = JSON.stringify(response.success);
                  localStorage.setItem('userToken', this.userToken);
                  this.loading = false;
                  setTimeout(() => {
                    this.router.navigate(['home'],{
                      queryParams: {
                        'student_id':this.student_id,
                        'userToken':this.userToken
                      }
                    })
                  }, 3000); 
                }
                
			},
			error =>{
				console.log(<any>error);
                this.loginCredentialsError = ERROR_MSG.error_saving_credentials+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }
  
  get userName() { return this.loginCredentialsForm.get('userName'); }
  get password() { return this.loginCredentialsForm.get('passwordGroup').get('password'); }
  get confirmPassword() { return this.loginCredentialsForm.get('passwordGroup').get('confirmPassword'); }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private _studentService: StudentService,
              private uniqueUserNameValidator: UniqueUserNameValidator){}

}
