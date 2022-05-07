import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { Userr } from 'app/shared/models/user.model';
import { AuthsService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;

  signinForm: FormGroup;
  credentials = {
    email: '',
    password: '',
  };
  isLoading: boolean = false;
  userData: any = {};
  constructor(private router: Router,
    private apiservice: ApiService,
    private auth: AuthsService,
    // private toastr:
  ) { }

  // signIn() {
  //   this.isLoading = true
  //   this.apiservice.login(this.credentials).subscribe(res => {
  //     this.userData = res;
  //     if (this.userData.isSuccess && (this.userData.data.role === ("superAdmin" || "extractor"||"proofreader")) ) {
  //       localStorage.setItem('token', this.userData.data.token);
  //       localStorage.setItem('userData', JSON.stringify(this.userData.data));
  //       this.isLoading = false;
  //       this.router.navigate(['dashboard/analytics']);
  //     }
  //     else {
  //       alert(this.userData.error);
  //       return this.isLoading = false;
  //     };
  //   });
  // }

  signIn() {
    if (this.credentials.email) {
      let email = this.credentials.email.toLowerCase();
      this.credentials.email = email;
    }
    this.auth.login(this.credentials).subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData.data.role)
      if(this.userData.isSuccess==true){
        switch(this.userData.data.role) { 
          case "superAdmin" : case "proofreader": case "extractor": { 
            this.isLoading = false;
            this.auth.setUser(this.userData.data)
            this.router.navigate(['dashboard/analytics']);
             break; 
          } 
          case "operationadmin": { 
            this.isLoading = false;
            this.auth.setUser(this.userData.data)
            this.router.navigate(['beta-program/enrolled']);
             break; 
          } 
          // case "extractor": { 
          //   this.isLoading = false;
          //   this.router.navigate(['dashboard/analytics']);
          //    break; 
          // } 
          default: { 
            alert("You are not authorised user");
             break; 
          } 
       } 
    }
      else {
        alert(this.userData.error);
        return this.isLoading = false;
      };
    });
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

}
