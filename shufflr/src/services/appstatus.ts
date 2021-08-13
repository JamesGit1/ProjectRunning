import { Injectable } from '@angular/core';

@Injectable()
export class appstatus {
    loggedIn:boolean;
    
    private hiddenData:string; // Can only be used internally

    constructor(){ }

    someFunction(){
        // Does something...
    }

    // Can only be used internally
    private somePrivateFunction(){
        // Does something else...
    }
}