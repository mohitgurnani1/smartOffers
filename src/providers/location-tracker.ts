import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { RestapiServiceProvider } from './restapi-service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Injectable()
export class LocationTracker {

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public deviceToken : any;

  constructor(public zone: NgZone, public backgroundGeolocation : BackgroundGeolocation, public geolocation : Geolocation , public restAPI : RestapiServiceProvider, private backgroundMode: BackgroundMode, 
    public push:Push, 
    public alertc:AlertController) {
    this.backgroundMode.enable();
    this.pushSetup();
  }
 
  pushSetup(){
    
      const options: PushOptions = {
        android: {},
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
    };
    
    const pushObject: PushObject = this.push.init(options);
    
    pushObject.on('notification').subscribe((notification: any) => {
      if(notification.additionalData.foreground){
        let yourAlert =this.alertc.create({
        title:'New Push Notification',
        message:notification.message
    
    });
    yourAlert.present();
    }
    });
    
    pushObject.on('registration').subscribe((registration: any) => {alert('Device registered'+ registration.registrationId)
    this.deviceToken= registration.registrationId;
  });
    
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }

  startTracking() {
 // Background Tracking
 
 let config = {
  desiredAccuracy: 0,
  stationaryRadius: 20,
  distanceFilter: 10,
  debug: true,
  interval: 2000
};

this.backgroundGeolocation.configure(config).subscribe((location) => {

  console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.restAPI.postData(this.lat,this.lng, this.deviceToken);

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

console.log(position);

// Run update inside of Angular's zone
this.zone.run(() => {
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;
  //this.restAPI.postData(this.lat,this.lng);  
});

});
  

}
 
  stopTracking() {
 
    console.log('stopTracking');
    
     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();
    
 
  }
}
