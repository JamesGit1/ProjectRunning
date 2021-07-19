import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result = {};

  constructor(public navCtrl: NavController) {}

  authWithSpotify() {
    const config = {
      clientId: '6875299652d04e53a7067cf12fa0d627',
      redirectUrl: 'shufflr://callback',
      scopes: [
        'streaming',
        'playlist-read-private',
        'user-read-email',
        'user-read-private',
      ],
      tokenExchangeUrl: 'https://shufflr-spotify.herokuapp.com/exchange',
      tokenRefreshUrl: 'https://shufflr-spotify.herokuapp.com/refresh',
    };

    cordova.plugins.spotifyAuth
      .authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.result = {
          accessTokenResult: accessToken,
          expiresAtResult: expiresAt,
          ref: encryptedRefreshToken,
        };
      });
  }
}
