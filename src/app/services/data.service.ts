import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  public extractData(response: Response) {
    let body = response.json();
    return body || {};
  }
}