import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAddService {
  baseURL:string = 'http://localhost:8085/';
  constructor(private http: HttpClient) { }

  saveUser(user: User){
    return  this.http.post(this.baseURL+'saveuser',user);
  }
}
