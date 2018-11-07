import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ERROR_CODES } from '../services/error_codes';
import { SUCCESS_MSG, ERROR_MSG } from '../services/strings';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  public sendResetPasswordError: string;
  public sendResetPasswordSuccess: string;
  public sendResetPasswordErrorCode: number;
  public showForgotUsernameMessage: boolean;
  public loading: boolean;
  
  forgotPasswordForm = this.formBuilder.group({
    userName: ['',{validators: [Validators.required]}]
  });

  constructor(private formBuilder: FormBuilder, private _studentService: StudentService) { }

  ngOnInit() {
  }
  
  toggleForgotUsernameMessage() {
    this.showForgotUsernameMessage = !this.showForgotUsernameMessage;
    this.clearMessages();
    return false;
  }
  
  clearMessages() {
    this.sendResetPasswordError = '';
    this.sendResetPasswordSuccess = '';
    this.sendResetPasswordErrorCode = 0;
  }
  
  onSubmit() {
    this.loading = true;
    this.sendResetPasswordError = '';
    this.sendResetPasswordSuccess = '';
    this.showForgotUsernameMessage = false;

    this._studentService.sendResetPasswordEmail(this.userName.value).subscribe(
			response => {
                if (response.error) {
                  this.sendResetPasswordError = response.error;
                  this.sendResetPasswordErrorCode = response.error_code;
                  if (this.sendResetPasswordErrorCode == ERROR_CODES.student_not_found) {
                    this.sendResetPasswordError = ERROR_MSG.username_not_found;
                  }
                }
                else { 
                  this.sendResetPasswordSuccess = response.success;   
                }
                this.loading = false;
			},
			error =>{
				console.log(<any>error);
                this.sendResetPasswordError = ERROR_MSG.error_send_password_reset_email+' '+ERROR_MSG.contact_jse;
                this.loading = false;
			}
		);
  }
  
  get userName() { return this.forgotPasswordForm.get('userName'); }
  get student_not_found_error_code() { return ERROR_CODES.student_not_found; }
  get contact_jse_error_msg() { return ERROR_MSG.contact_jse; }
}
