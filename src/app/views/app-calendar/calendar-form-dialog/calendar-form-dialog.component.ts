import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EgretCalendarEvent } from '../../../shared/models/event.model';
import { ApiService } from 'app/shared/services/api.service.service';
import { User } from 'app/views/app-chats/chat.service';
import { Userr } from 'app/shared/models/user.model';

interface DialogData {
  event?: CalendarEvent,
  action?: string,
  date?: Date
}

@Component({
  selector: 'app-calendar-form-dialog',
  templateUrl: './calendar-form-dialog.component.html',
  styleUrls: ['./calendar-form-dialog.component.scss']
})
export class CalendarFormDialogComponent implements OnInit {
  event: CalendarEvent;
  dialogTitle: string;
  eventForm: FormGroup;
  action: string;
  providers: any = [];
  constructor(
    public dialogRef: MatDialogRef<CalendarFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: FormBuilder,
    private apiservice: ApiService
  ) {
    this.event = data.event;
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = this.event.title;
    } else {
      this.dialogTitle = 'Add Event';
      this.event = new EgretCalendarEvent({
        start: data.date,
        end: data.date
      });
    }
    console.log('data', data);
    this.eventForm = this.buildEventForm(this.event);
    console.log(' this.event', this.event)
  }
  searchProvider(e: string) {
    this.apiservice.searchProviderByName(e).subscribe((res) => {
      this.providers = res;
      console.log('providers', this.providers)
    })
  }
  selectedProviderId(e) {
    this.eventForm.value.userId = e._id;
    console.log('this.eventForm.value.userId', this.eventForm.value.userId)
  }
  public getProviderName(e) {
    if (e) {
      return e.firstName;
    }
  }
  ngOnInit() {
  }
  buildEventForm(event: EgretCalendarEvent) {
    return new FormGroup({
      _id: new FormControl(event._id),
      title: new FormControl(event.title),
      start: new FormControl(event.start),
      end: new FormControl(event.end),
      allDay: new FormControl(event.allDay),
      userId: new FormControl(event.userId),
      description: new FormControl(event.description),
      color: this.formBuilder.group({
        primary: new FormControl(event.color.primary),
        secondary: new FormControl(event.color.secondary)
      }),
      meta: this.formBuilder.group({
        location: new FormControl(event.meta.location),
        notes: new FormControl(event.meta.notes)
      })
    });
  }
}
