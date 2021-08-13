import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import SpotifyWebApi from 'spotify-web-api-js';

import { appstatus } from '@services/appstatus';
import { IonLoaderService } from '../../ion-loader.service';

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result = {};
  lastsongs = {};
  data = '';
  spotifyApi: any;
  playlists = [];
  loggedIn = false;
  usersName: string [];

  constructor(private storage: Storage, private plt: Platform, private appData: appstatus, private ionLoaderService: IonLoaderService) {
    this.spotifyApi = new SpotifyWebApi();
    this.plt.ready().then(() => {
      this.storage.get('logged_in').then(res => {
        // console.log("LOGGEDINRESPONSE:");
        // console.log(res);
        if (res) {
          this.authWithSpotify(true);
        }
      });
    });
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  //LOADER CODE
  displayAutoLoader() {
    this.ionLoaderService.autoLoader();
  }

  showLoader() {
    this.ionLoaderService.simpleLoader();
  }

  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }

  customizeLoader() {
    this.ionLoaderService.customLoader();
  }


  authWithSpotify(showLoading = false) {
    const config = {
      clientId: '6875299652d04e53a7067cf12fa0d627',
      redirectUrl: 'shufflr-spotify://callback',
      scopes: [
        'streaming',
        'playlist-read-private',
        'user-read-email',
        'user-read-private',
        "user-read-recently-played",
      ],
      tokenExchangeUrl: 'https://shufflr-spotify.herokuapp.com/exchange',
      tokenRefreshUrl: 'https://shufflr-spotify.herokuapp.com/refresh',
    };

    if (showLoading) {
      //this.showLoader();
      // this.loading = this.loadingController.create({
      //   message: 'Please Wait...',
      // });
      // this.loading.present();
    }

    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.hideLoader();

        // eslint-disable-next-line @typescript-eslint/naming-convention
        //Set result of api call
        this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };

        this.spotifyApi.setAccessToken(accessToken);

        this.getUserDetails();
        //this.getUsersLastSongs();
        //this.getUserPlaylists();


        //Set local loggedin value as well as service and stored value
        this.loggedIn = true;
        this.appData.loggedIn = true;
        this.storage.set('logged_in', true);

      }, err => {
        console.error(err);
        this.hideLoader();
      });
  }

  getUserPlaylists() {
    this.spotifyApi.getUserPlaylists().then(data => {
      this.playlists = data.items;
    }, err => {
      console.error(err);
    });
  }

  getUserDetails() {
    this.spotifyApi.getMe().then(data => {
      var user = data;
    }, err => {
      console.error(err);
    });
  }

  getUsersLastSongs() {
    this.spotifyApi.getMyRecentlyPlayedTracks().then(data => {
      this.lastsongs = data;
    }, err => {
      this.lastsongs = err;
      console.error(err);
    });
  }

  // openPlaylist(item) {
  //   this.navCtrl.push('PlaylistPage', { playlist: item });
  // }

  spotifyLogOut() {
    this.result = {};
    cordova.plugins.spotifyAuth.forget();

    this.loggedIn = false;
    this.appData.loggedIn = false;
    this.playlists = [];
    this.storage.set('logged_in', false);
  }
}
