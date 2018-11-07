import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { SUCCESS_MSG, ERROR_MSG } from '../services/strings';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loading: boolean;
  public loginError: string;
  public loginSuccess: string;
  public userToken: string;

  loginForm = this.formBuilder.group({
    userName: ['',{validators: [Validators.required]}],
    password: ['', {validators: [Validators.required]}]
  });
 
  ngOnInit() {
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.loading = true;
    this.loginError = '';
    this.loginSuccess = '';
    this._loginService.login(
      this.userName.value, 
      this.password.value).subscribe(
			response => {
              console.log('response ',response);
				if(response.error){
					this.loginError = response.error;
                    this.loading = false;
				}
                else {
                  if (response.success == null) {
                    this.loginError = ERROR_MSG.invalid_username_or_password;
                  }
                  else {
                    this.loginSuccess = SUCCESS_MSG.login_success;
                    console.log('login response',this.loginSuccess);
                    this.userToken = JSON.stringify(response.success);
                    localStorage.setItem('userToken', this.userToken);
                    this.router.navigate(['home'],{
                      queryParams: {
                        'student_id':response.success.student_id,
                        'userToken':this.userToken
                      }
                    });
                  }  
                  this.loading = false;
                }
                
			},
			error =>{
				console.log(<any>error);
                this.loginError = ERROR_MSG.error_login+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }
  
  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
  
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private _loginService: LoginService
              ){}

}
