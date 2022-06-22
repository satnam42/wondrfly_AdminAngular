import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'app/shared/services/api.service.service';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent implements OnInit {
  reason: string = '';
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupFormComponent>,
    private apiService: ApiService,
    private dataservice: DataService,
    private snack: MatSnackBar) { }

  ngOnInit() {

  }

  setData() {
    let body = {
      id: this.data._id,
      reason: this.reason
    }
    this.apiService.setExpired(body).subscribe((res: any) => {
      if (res.isSuccess) {
        let msg = 'Program Expired'
        this.snack.open(msg, 'ok', { duration: 4000 });
        this.dataservice.setOption(res);
      }
    })
    this.dialogRef.close();
  }


}
