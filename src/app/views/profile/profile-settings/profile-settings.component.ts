import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/shared/services/dataservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service.service';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Userr } from 'app/shared/models/user.model';
import { AuthsService } from 'app/shared/services/auth.service';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  //  uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  hasBaseDropZoneOver: boolean = false;
  user: Userr;
  imgResponse: any;
  fileData: File = null;
  msg: string;
  imagePath;
  imgURL: any;
  message: string = 'Image Uploaded Successfully !';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  formData = new FormData();
  id: any;

  constructor(private dataservice: DataService,
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private loader: AppLoaderService) {
      this.user = this.dataservice.getOption();
    this.activatedRoute.params.subscribe(params => {
      this.user.id = params['id'];
      console.log(this.user.id)
    })
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    // config.extraClasses = this.addExtraClass ? ['test'] : undefined;
  }

  getUserByid(){
    this.apiservice.getUserById(this.user.id).subscribe((res:any) =>{
       this.user= res;
       if(this.user.role=='superAdmin'){
        this.auth.setUser(this.user);
       }else{
         this.dataservice.setOption(this.user)
       }
       console.log(res)
    })
  }

  back() {
    this.router.navigate(['profile/child', this.user.id]);
  }
  fileSelect(event) {

    this.fileData = event.target.files[0];
    this.formData.append('image', this.fileData);

    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = " only images are supported";
      return;
    }
    // -------------------------------------------------------------------------------

  }
  upload() {
    this.loader.open();
    this.apiservice.uploadUserImage(this.user.id, this.formData).subscribe(res => {
      this.imgResponse = res;
      this.loader.close();
      if (this.imgResponse.isSuccess === true) {
        this.dataservice.setOption(this.imgResponse.data);
        this.snack.open(this.message, 'OK', { duration: 4000 });
        if(this.user.role=='superAdmin'){
          this.getUserByid();
        }
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['profile/settings',this.user.id]);
          console.log('reloaded')
        })

      } else {
        let msg = "Something Went Wrong!";
        this.snack.open(msg, 'OK', { duration: 4000 });

      }
    });
  }

  ngOnInit() {
  this.getUserByid()
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
