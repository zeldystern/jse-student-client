import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Http, HttpModule, Response, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Student } from '../models/student';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class StudentService {
  public url: string;
  private studentSource = new BehaviorSubject(null);
  student = this.studentSource.asObservable();
  
  constructor(private _http: Http, private _dataService: DataService){
       this.url = GLOBAL.url;
  }
  
  testGetData() : Observable<any> {
      const json = JSON.stringify({ test: 'this is a test' });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',
                                   'Authorization': localStorage.getItem('userToken')});

      return this._http.post(`${this.url}/student/test-get-data`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
    
  sendSignupConfirmationEmail(dob: string, ssn: string, email: string): Observable<any> {
      const json = JSON.stringify({ dob: dob, ssn: ssn, email: email });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/send-signup-email`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
  
  updateStudent(student: Student) {
    this.studentSource.next(student);
  }
  
  sendConfirmationEmail(student_id: number, email: string) : Observable<any> {
      const json = JSON.stringify({ email: email, studentId: student_id });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/generate-token`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
  
  sendResetPasswordEmail(userName: string): Observable<any> {
      const json = JSON.stringify({ userName: encodeURIComponent(userName) });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/send-reset-password-email`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data => data));
  }
  
  confirmToken(student_id: number, token: string) : Observable<any> {
      const json = JSON.stringify({ studentId: student_id, token: token });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/confirm-token`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
  
  isUserNameTaken(userName: string): Observable<boolean> {
      const json = JSON.stringify({ userName: encodeURIComponent(userName) });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/is-username-taken`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data => data));
  }
  
  saveLoginCredentials(student_id: number, userName: string, userPass: string) : Observable<any> {
      const json = JSON.stringify({ 
        studentId: student_id, 
        userLogin: encodeURIComponent(userName),
        userPassword: userPass 
      });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/student/save-credentials`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
}