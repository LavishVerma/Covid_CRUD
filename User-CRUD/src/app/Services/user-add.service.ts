import { HttpClient, HttpParams } from '@angular/common/http';
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

  deleteUser(id:any){
    return this.http.delete(this.baseURL+'user/save/'+id);
  }

  editUser(user: User){
    return this.http.put(this.baseURL+'user/save',user);
  }

  getUsersPagination(pageIndex:any,pageSize:any){
    const params = new HttpParams()
     .set('pageIndex', pageIndex)
     .set('pageSize', pageSize);
     console.log(params);
     
    return this.http.get(this.baseURL+'user/viewPage',{params});
  }

  getUsersPaginationDefault(){
        return this.http.get(this.baseURL+'user/viewPage');
  }

  getHeaderFlag() {
    return this.headerFlag.asObservable();
  }

  setHeaderFlag(flag:boolean) {
    this.headerFlag.next(flag);
  }
}
