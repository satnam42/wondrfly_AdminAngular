import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Userr } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthsService {
    root = environment.apiURL;  
    private _user: Userr;
  public _currentUserSubject = new Subject<Userr>();
  userChanges = this._currentUserSubject.asObservable()
    token: any;

  constructor(
    private http: HttpClient,
    private store: LocalStorageService,
    private router: Router
  ) {
  }

 setUser(user: Userr) {
    if (user) {
      this.store.setObject('userData', user);
      this.store.setItem('token', user.token);
    } else {
      this.store.clear();
    }
    this._user = user;
    this._currentUserSubject.next(user);
  }


  setUserById(user: Userr) {
    if (user) {
      this.store.setObject('CurrentUserWondrfly', user);
      this.store.setItem('currentUserWondrflyToken', user.token);
      var url = "https://wondrfly.com";
      var win = window.open(url, '_blank');
          win.opener = null;
          win.focus();
    } else {
      this.store.clear();
    }
  }

  currentUser(): Userr {
    // if (this._user) {
      this._user = this.store.getObject('userData') as Userr;
      return this._user
    // }
// else{
//   this.store.clear();
// }

  }


  login(model): Observable<Userr[]> {
    const subject = new Subject<Userr[]>();
    this.http.post(`${this.root}/users/login`, model, { headers: null }).subscribe((responseData: any) => { 
      const dataModel = responseData
      subject.next(dataModel);
    },
      (error) => {
        subject.next(error.error);
      });
    return subject.asObservable();
  }


  isAuthorized() {
    this.token = this.store.getItem('token');
    return this.token
  }

  logout() {
    this.store.removeItem('userData');
    this.store.removeItem('token');
    this.setUser(null)
  }
}
