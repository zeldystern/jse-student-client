import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { UniqueUserNameValidator } from '../validators/user-validation.directive';
import { PasswordValidation } from '../validators/password-validation';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'login-credentials-app',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.scss']
})
export class LoginCredentialsComponent implements OnInit {

  public student_id: number;
  public loginCredentialsError: string;
  public loginCredentialsSuccess: string;
  public loading: boolean;
  
  loginCredentialsForm = this.formBuilder.group({
    userName: ['',Validators.compose([Validators.required, Validators.minLength(6)]), this.uniqueUsernameValidator.validate.bind(this.uniqueUsernameValidator)],
    passwordGroup: this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: PasswordValidation.MatchPassword
    })
  },
  { updateOn: 'blur' }
 );
 
 ngOnInit() {
    this.student_id = +this.route.snapshot.paramMap.get("student_id");
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
				}
                else {
                  this.loginCredentialsSuccess = response.success;
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.loading = false;
			}
		);
  }
  
  get userName() { return this.loginCredentialsForm.get('userName'); }
  get password() { return this.loginCredentialsForm.get('passwordGroup').get('password'); }
  get confirmPassword() { return this.loginCredentialsForm.get('passwordGroup').get('confirmPassword'); }

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private _studentService: StudentService,
              private uniqueUsernameValidator: UniqueUserNameValidator){}

}
