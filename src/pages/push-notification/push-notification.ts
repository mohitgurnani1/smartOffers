import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'push-notification.html'
})
export class PushNotificationPage {
  pushMessage: string = 'push message will be displayed here';


  apiUrl = 'http://192.168.43.86:8090/transaction/deviceTokenId/';
  data : any;
  

  constructor(private toastCtrl: ToastController, public params: NavParams, public http: Http) {
    if (params.data.message) {
      this.pushMessage = params.data.message;
    }
  }


  newProject() {
    
    setTimeout(()=>{this.presentToast();}, 2000);
    

    return new Promise(resolve => {
      this.http.get(this.apiUrl)
      .subscribe(data => {
          this.data = data;
          resolve(this.data);
          
        });
      });

    
  }

    
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Payment successfully done',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  

}

  



