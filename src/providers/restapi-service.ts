import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {

  data: any;

  apiUrl = 'http://192.168.43.184:8080/mohit/';
  
  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }

  postData(a : number, b: number, c: any) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+a+'/'+b+'/'+c)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
