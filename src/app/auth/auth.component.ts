import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "./auth.service"

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isValidUSer:boolean;
    constructor(private authService:AuthService,private router:Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isValidUSer = this.authService.validateUser(email,password);
        if(this.isValidUSer==true){
            this.router.navigate(['/dashboard'])
        }
        form.reset();
    }
}