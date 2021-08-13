import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { appstatus } from '@services/appstatus';

declare let cordova: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage{
  loggedIn:boolean = false;
  test:string;
  
  constructor(private storage: Storage, private appData: appstatus) {
    this.loggedIn = appData.loggedIn;
  }
  
  spotifyLogOut() {
    cordova.plugins.spotifyAuth.forget();

    this.storage.set('logged_in', false);
  }
}
