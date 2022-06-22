import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'app/shared/services/api.service.service';

@Component({
  selector: 'app-rolespopup',
  templateUrl: './rolespopup.component.html',
  styleUrls: ['./rolespopup.component.scss']
})
export class RolespopupComponent implements OnInit {
  roles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RolespopupComponent>,
    private apiservice: ApiService
  ) { }

  getRoles() {
    this.apiservice.getRoles().subscribe((res: any) => {
      this.roles = res;
    })
  }

  ngOnInit() {
    this.getRoles()
  }

}
