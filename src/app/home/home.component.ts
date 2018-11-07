import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _studentService: StudentService,
              private _loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this._studentService.testGetData().subscribe(
			response => {
				if(response.error){
					console.log('error ',response.error);
                    
				}
                else {
                  console.log('success ',response.success);
                  
                }
                
			},
			error =>{
				console.log(<any>error);  
			}
		);
  }
  
  logout() {
    this._loginService.logout();
    this.router.navigate(['login']);
  }

}
