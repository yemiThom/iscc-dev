import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

declare var applozic:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, platform: Platform) {
  	platform.ready().then(() => {
  		alert("platform ready");
  		 var alUser = {
            'userId' : 'debug2',   //Replace it with the userId of the logged in user
            'password' : 'debug2',  //Put password here
            'authenticationTypeId' : 1,
            'applicationId' : 'applozic-sample-app' //replace "applozic-sample-app" with Application Key from Applozic 
        };
       alert("login to chat");
	   applozic.login(alUser, function() {
	        		applozic.launchChat(function() {}, function() {});
	        	}, function() {});
    });
  }

}
