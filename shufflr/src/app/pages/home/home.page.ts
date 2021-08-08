import { Component } from '@angular/core';
import { NavController, Platform, LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import SpotifyCall from '../../../assets/js/SpotifyWebApi';

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result = {};
  lastsong = {};
  data = '';
  spotifyApi: any;
  playlists = [];
  loggedIn = false;
  //loading: Loading;

  constructor(public navCtrl: NavController, private storage: Storage, private plt: Platform, private loadingCtrl: LoadingController) {
    this.spotifyApi = SpotifyCall.spotifyCall();
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
      ],
      tokenExchangeUrl: 'https://shufflr-spotify.herokuapp.com/exchange',
      tokenRefreshUrl: 'https://shufflr-spotify.herokuapp.com/refresh',
    };

    if (showLoading) {
      /*
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      */
    }

    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        /*
        if (this.loading) {
          this.loading.dismiss();
        }
        */

        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };
        this.loggedIn = true;
        this.spotifyApi.setAccessToken(accessToken);
        this.lastsong = this.spotifyApi.getMyRecentlyPlayedTracks();
        //this.getUserPlaylists();
        this.storage.set('logged_in', true);
      }, err => {
        console.error(err);
        /*
        if (this.loading) {
          this.loading.dismiss();
        }
        */
      });
  }

  getUserPlaylists() {
    this.spotifyApi.getUserPlaylists().then(data => {
        this.playlists = data.items;
      }, err => {
        console.error(err);
      });
  }

  spotifyLogOut() {
    this.result = {};
    cordova.plugins.spotifyAuth.forget();

    this.loggedIn = false;
    this.playlists = [];
    this.storage.set('logged_in', false);
  }
}
