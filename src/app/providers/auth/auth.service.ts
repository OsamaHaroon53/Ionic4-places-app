import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedin = false;
  userId = 'xyz'
  constructor() { }

  isLogin(){
    return this.isLoggedin;
  }

  getUserId(){
    return this.userId;
  }

  logIn(){
    this.isLoggedin = true;
  }

  logOut(){
    this.isLoggedin = false;
  }
}
