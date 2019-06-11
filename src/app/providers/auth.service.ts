import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedin = false;
  constructor() { }

  isLogin(){
    return this.isLoggedin;
  }

  logIn(){
    this.isLoggedin = true;
  }

  logOut(){
    this.isLoggedin = false;
  }
}
