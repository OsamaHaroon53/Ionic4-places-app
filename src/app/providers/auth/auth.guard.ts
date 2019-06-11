import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService, private navCtrl: NavController){}

  canLoad(): boolean {
    let isLoggedIn = this.auth.isLogin();
    if(!isLoggedIn){
      this.navCtrl.navigateRoot('/auth');
    }
    return isLoggedIn;
  }
}
