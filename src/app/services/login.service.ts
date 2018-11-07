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

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public url: string;
  public loginError: string;
  public loginSuccess: string;

  constructor(private _http: Http, private _dataService: DataService){
       this.url = GLOBAL.url;
  }
  
  login(userName: string, userPass: string) : Observable<any> {
      const json = JSON.stringify({ 
        userLogin: encodeURIComponent(userName),
        password: userPass 
      });
      const params = `json=${json}`;
      const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      return this._http.post(`${this.url}/login/authenticate`,params,{headers: headers})
                  .pipe(map(this._dataService.extractData),
                        tap(data =>  data));
  }
  
  logout() {
        // remove token from local storage to log user out
        localStorage.removeItem('userToken');
        console.log('logged out');
  }
}
