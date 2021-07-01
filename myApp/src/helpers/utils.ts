import { SpotifyAuth } from '@ionic-native/spotify-auth/ngx';

var result = {};

export function enableDarkTheme(shouldEnable: boolean) {
  document.body.classList.toggle("dark", shouldEnable);
}

export function authWithSpotify() {
  const spotifyAuth = new SpotifyAuth();

  const config = {
    clientId: "6875299652d04e53a7067cf12fa0d627",
    redirectUrl: "shufflr-spotify://callback",
    scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"],
    tokenExchangeUrl: "https://shufflr-spotify.herokuapp.com/exchange",
    tokenRefreshUrl: "https://shufflr-spotify.herokuapp.com/refresh",
  };

  spotifyAuth.authorize(config).then(({ accessToken, expiresAt }) => {
    console.log(`Got an access token, its ${accessToken}!`);
    console.log(`Its going to expire in ${expiresAt - Date.now()}ms.`);
    result = { access_token: accessToken, expires_in: expiresAt };
  });
}

