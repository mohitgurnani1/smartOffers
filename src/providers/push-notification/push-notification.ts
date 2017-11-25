import { Injectable } from '@angular/core';
import { PushNotificationPage } from '../../pages/push-notification/push-notification';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController, App } from 'ionic-angular';
/*
  Generated class for the PushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushNotificationProvider {

  
  public deviceToken : any;
  
  
  constructor( public appCtrl: App, public push:Push, 
    public alertc:AlertController) {
    console.log('Hello PushNotificationProvider Provider');
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
    
    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertc.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.appCtrl.getRootNav().push(PushNotificationPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.appCtrl.getRootNav().push(PushNotificationPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    // pushObject.on('notification').subscribe((notification: any) => {
    //   if(notification.additionalData.foreground){
    //     let yourAlert =this.alertc.create({
    //     title:'New Push Notification',
    //     message:notification.message
    
    // });
    // yourAlert.present();
    // }
    // });
    
    pushObject.on('registration').subscribe((registration: any) => {
    console.log('Device registered'+ registration.registrationId);
    this.deviceToken= registration.registrationId;
  });
    
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }




}
