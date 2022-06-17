import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'app/shared/services/dataservice.service';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit {
  address: string;
  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder;
  locationData: any = {
    address: '',
    lat: '',
    lng: ''
  };

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dataservice: DataService
  ) {
  }
  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }


  setData() {
    this.locationData = {
      address: this.address,
      lat: this.latitude,
      lng: this.longitude
    }
    this.dataservice.setOption(this.locationData);
    this.dialogRef.close();
  }

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }


  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log('results', results);
  //     console.log('status', status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }



}