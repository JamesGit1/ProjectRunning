import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';

import { appstatus } from '@services/appstatus';

declare let cordova: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage{
  loggedIn:boolean = false;
  
  constructor(private storage: Storage, private appData:appstatus, private plt:Platform) {
    this.loggedIn = appData.loggedIn;
  }
  
  spotifyLogOut() {
    this.loggedIn = false;
    this.storage.set('logged_in', false);
    cordova.plugins.spotifyAuth.forget();
  }
}
