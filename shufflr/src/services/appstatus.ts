import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable()
export class appstatus {
    loggedIn: boolean = false;

    constructor(private storage: Storage, private plt: Platform) {
        //When ready check if system logged in already
        this.plt.ready().then(() => {
            this.storage.get('logged_in').then(res => {
                if (res) {
                    this.loggedIn = true;
                }
            });
        });
    }
}