import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { RestapiServiceProvider } from './restapi-service';
import { PushNotificationProvider } from './push-notification/push-notification';


@Injectable()
export class LocationTracker {

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public deviceToken : any;
  constructor(public zone: NgZone, public backgroundGeolocation : BackgroundGeolocation, public geolocation : Geolocation , public restAPI : RestapiServiceProvider 
   , public pushNotification : PushNotificationProvider
  ) {
    
  }
 
  startTracking( ) {

this.pushNotification.pushSetup();
this.deviceToken = this.pushNotification.deviceToken;
 // Background Tracking
 //this.backgroundMode.enable();
 let config = {
  desiredAccuracy: 0,
  stationaryRadius: 20,
  distanceFilter: 10,
  debug: false,
  interval: 20,
  stopOnTerminate: false,
};

this.backgroundGeolocation.configure(config).subscribe((location) => {

  console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.restAPI.postData(this.lat,this.lng, this.pushNotification.deviceToken);

  });

}, (err) => {

  console.log(err);

});

// Turn ON the background-geolocation system.
this.backgroundGeolocation.start();


// Foreground Tracking

let options = {
frequency: 3000,
enableHighAccuracy: true
};

this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

console.log(position.coords.latitude);

// Run update inside of Angular's zone
this.zone.run(() => {
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;
  this.restAPI.postData(this.lat,this.lng, this.pushNotification.deviceToken);  
});

});
  

}
 
  stopTracking() {
 
    console.log('stopTracking');
    
     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();
    
 
  }
}
