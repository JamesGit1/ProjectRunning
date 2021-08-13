import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import SpotifyWebApi from 'spotify-web-api-js';

import { appstatus } from '@services/appstatus';

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
  loading; //TODO: Get loading to work correctly, just sets up controller at the moment

  constructor(private storage: Storage, private plt: Platform, public loadingController: LoadingController, private appData: appstatus) {
    this.spotifyApi = new SpotifyWebApi();

    this.plt.ready().then(() => {
      this.storage.get('logged_in').then(res => {
        if (res) {
          this.authWithSpotify(true);
        }
      });
    });
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
      this.loading = this.loadingController.create({
        message: 'Please Wait...',
      });
      this.loading.present();
    }

    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        if (this.loading) {
          this.loading.dismiss();
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        //Set result of api call
        this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };
        
        

        this.spotifyApi.setAccessToken(accessToken);

        //this.getUsersLastSongs();
        //this.getUserPlaylists();


        //Set local loggedin value as well as service and stored value
        this.loggedIn = true;
        this.appData.loggedIn = true;
        this.storage.set('logged_in', true);

      }, err => {
        console.error(err);
        if (this.loading) {
          this.loading.dismiss();
        }
      });
  }

  getUserPlaylists() {
    this.spotifyApi.getUserPlaylists().then(data => {
      this.playlists = data.items;
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
