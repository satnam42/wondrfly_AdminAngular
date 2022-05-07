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
        console.log('setOption', option);
        console.log('data from data service = >> ', this.data);
        this._currentUserSubject.next(option);
        this._dataSubject.next(option);
    }

    getOption() {
        console.log('getOption', this.data);
        return this.data;
    }


    constructor() { }
}
