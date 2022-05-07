import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TablesService } from 'app/views/tables/tables.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/services/dataservice.service';
import { ApiService } from 'app/shared/services/api.service.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  formData = {};
  basicForm: FormGroup;

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',

  };


  FormData: any;
  submitted: boolean;
  usersData: any = {};
  responseData: any;
  res: any[];



  constructor(private service: TablesService,
    public dataRoute: ActivatedRoute,
    private dataservice: DataService,
    private apiservice: ApiService,
    private route: Router) {
    this.user = dataservice.getOption();
  }

  back() {
    this.route.navigate(['tables/paging']);
  }
  
  ngOnInit() {

    // console.log('kkkkkkkkkkk', JSON.parse(this.dataRoute.snapshot.params['objectProducts']))
    // let user = JSON.parse(this.dataRoute.snapshot.params['objectProducts'])
    // tslint:disable-next-line:prefer-const
    let password = new FormControl('', Validators.required);
    // tslint:disable-next-line:prefer-const
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.basicForm = new FormGroup({
      fname: new FormControl('', [
        // Validators.minLength(4),
        // Validators.maxLength(9)
      ]),
      lname: new FormControl('', [
        // Validators.minLength(4),
        // Validators.maxLength(9)
      ]),
      age: new FormControl('', [
        // Validators.required
      ]),
      email: new FormControl('', [
        // Validators.required,
        // Validators.email
      ]),
      phoneno: new FormControl('', [
        // Validators.required
      ]),
      website: new FormControl('', CustomValidators.url),
      date: new FormControl(),
      company: new FormControl('', [
        // CustomValidators.creditCard
      ]),
      phone: new FormControl('', CustomValidators.phone('BD')),
      password: password,
      confirmPassword: confirmPassword,
      gender: new FormControl('', [
        Validators.required
      ]),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true };
        }
        return null;
      })
    });
  }

  updateParent() {

    this.apiservice.updateParent(this.user.id, this.user).subscribe(res => {

      // if (this.user.isSuccess === true) {
      alert('data updated successfully');
      // this.router.navigate(['tables/paging']);
      this.route.navigate(['tables/paging']);
      //    else { alert('enter valid input'); }
      // }
    });
  };



  onSubmit() {

    this.submitted = true;
    return this.updateParent();
  }
}


