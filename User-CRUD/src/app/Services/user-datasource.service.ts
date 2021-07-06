import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserPageResponse } from '../Models/user.model';
import { UserAddService } from './user-add.service';
import { catchError, finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserDatasourceService implements DataSource<User> {

  private userSubject = new BehaviorSubject<User[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
 public loading$ = this.loadingSubject.asObservable();

  constructor(private userAddService: UserAddService) { }
  connect(collectionViewer: CollectionViewer): Observable<readonly User[]> {
    return this.userSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
  }

  loadUsers(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(false);
    this.userAddService.getUsersPagination( pageNumber, pageSize )
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(true))
        )
        .subscribe((result: any) => {
          console.log(result);
            
            this.userSubject.next(result.content);
            this.countSubject.next(result.totalElements);
        }
        );
}

}
