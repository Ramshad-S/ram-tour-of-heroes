import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class AuthService{

    emailId:string = "test@gmail.com";
    pass:string = "testpass"
    validUser:boolean = false;

    validateUser(email:string,password:string){
        if(email===this.emailId && password===this.pass ){
            this.validUser = !this.validUser;
            return true;
        }
        else{
            return false;
        }
    }
}