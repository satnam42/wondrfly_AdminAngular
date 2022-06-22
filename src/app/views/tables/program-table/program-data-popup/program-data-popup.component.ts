import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'program-data-popup',
  templateUrl: './program-data-popup.component.html'
})
export class ProgramDataPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProgramDataPopupComponent>,
    private dp: DatePipe
  ) {
    data.date.to = dp.transform(data.date.to, 'M/d/yy')
    data.date.from = dp.transform(data.date.from, 'M/d/yy')
  }
  ngOnInit() {
  }
}
