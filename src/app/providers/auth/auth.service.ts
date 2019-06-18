import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedin = false;
  private userInfo;
  constructor(private http: HttpClient) { }

  isLogin(): Observable<boolean> {
    return Observable.create((observer:any) => {
      Plugins.Storage.get({key: 'user'})
        .then(user=>{
          this.userInfo= JSON.parse(user.value);
          console.log(this.userInfo);
          if(this.userInfo){
            this.isLoggedin = true;
            console.log(this.userInfo.expiresDate)
            if(this.userInfo.expiresDate.valueOf()>Date.now()){
              this.logOut();
            }
          }
          else{
            this.isLoggedin = false;
          }
          observer.next(this.isLoggedin);
        })
    })
  }

  logIn(email, password) {
    this.isLoggedin = true;
    return this.http.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebaseApiKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  signUp(email,password){
    return this.http.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebaseApiKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  logOut() {
    this.isLoggedin = false;
    Plugins.Storage.clear();
  }

  setUser({ idToken, email, expiresIn, localId}){
    const expireDate = new Date(Date.now()+(expiresIn*1000));
    this.userInfo = { token: idToken, email: email, userId: localId, expiresDate: expireDate }
    let user = JSON.stringify(this.userInfo)
    Plugins.Storage.set({key: 'user', value: user});
  }
  getUserId(){
    // return from(Plugins.Storage.get({key: 'user'}))
    // .pipe(map(el=>{
    //   let user = JSON.parse(el.value)
    //   return user?user.userId: null;
    // }))
    if(!this.userInfo){
      return null;
    }
    console.log(this.userInfo)
    return this.userInfo.userId;
  }

  getEmail(){
    // return from(Plugins.Storage.get({key: 'user'}))
    // .pipe(map(el=>{
    //   let user = JSON.parse(el.value)
    //   return user?user.email: null;
    // }))
    if(!this.userInfo){
      return null;
    }
    return this.userInfo.email;
  }
}
