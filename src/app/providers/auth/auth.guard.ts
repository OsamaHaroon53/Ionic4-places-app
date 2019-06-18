import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private navCtrl: NavController) { }

  canActivate(): Observable<boolean> {
    return this.auth.isLogin().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated)
          this.navCtrl.navigateRoot('/auth');
      })
    );
  }
}
