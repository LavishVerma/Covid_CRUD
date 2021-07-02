import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAddService {
  private headerFlag = new BehaviorSubject<boolean>(false);

  baseURL:string = 'http://localhost:9090/';
  constructor(private http: HttpClient) { }

  saveUser(user: User){
    return  this.http.post(this.baseURL+'user/save',user);
  }

  getAllUsers(){
    return this.http.get(this.baseURL+'user/view');
  }

  getHeaderFlag() {
    return this.headerFlag.asObservable();
  }

  setHeaderFlag(flag:boolean) {
    this.headerFlag.next(flag);
  }
}
