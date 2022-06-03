import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Userr } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public _currentUserSubject = new Subject<Userr>();
    public _dataSubject = new Subject<any>();
    userChanges = this._currentUserSubject.asObservable();
    dataChanges = this._dataSubject.asObservable()
     data: any={};

    setOption(option) {
        this.data = option;
        this._currentUserSubject.next(option);
        this._dataSubject.next(option);
    }

    getOption() {
        return this.data;
    }


    constructor() { }
}
