import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarEventDB } from '../../shared/inmemory-db/calendarEvents';
import { Observable, of, Subject } from 'rxjs';
import { EgretCalendarEvent } from '../../shared/models/event.model';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { environment } from 'environments/environment.prod';

@Injectable()
export class AppCalendarService {
  root = environment.apiURL;
  public events: EgretCalendarEvent[];
  token: string = ''
  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }
  // --------------------access token------------------------
  getHeaders() {
    let header
    if (this.token != '') {
      header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': this.token
        })
      }
    } else {
    }
    return header;
  }
  public getEvents(): Observable<CalendarEvent[]> {
    const subject = new Subject<CalendarEvent[]>();
    this.http.get(`${this.root}/events/list`, this.getHeaders())
      .subscribe((response: any) => {
        this.events = response.data;
        subject.next(this.events);
        this.getEvents();
      }, (error) => {
        subject.next(error.error);
      });
    return subject.asObservable();
  }
  public addEvent(event): Observable<CalendarEvent[]> {
    const subject = new Subject<CalendarEvent[]>();
    this.http.post(`${this.root}/events/add`, event, this.getHeaders())
      .subscribe((events: any) => {
        this.events = events.data;
        this.getEvents();
      }, (error) => {
        subject.next(error.error);
      });
    this.events.push(event);
    return of(this.events);
  }
  public updateEvent(event): Observable<CalendarEvent[]> {
    const subject = new Subject<CalendarEvent[]>();
    this.http.put(`${this.root}/events/update/${event._id}`, event, this.getHeaders())
      .subscribe((events: any) => {
        console.log('response', events)
        this.events = events.data;
        this.getEvents();
      }, (error) => {
        subject.next(error.error);
      });
    if (this.events.length) {
      this.events = this.events.map(e => {
        if (e._id === event._id) {
          return Object.assign(e, event);
        }
        return e;
      });
    }
    return of(this.events);
  }
  public deleteEvent(eventID: string): Observable<EgretCalendarEvent[]> {
    const subject = new Subject<CalendarEvent[]>();
    this.http.delete(`${this.root}/events/delete/${eventID}`, this.getHeaders())
      .subscribe((events: any) => {
        this.events = events.data;
      }, (error) => {
        subject.next(error.error);
      });
    this.events = this.events.filter(e => e._id !== eventID);
    return of(this.events);
  }
}
