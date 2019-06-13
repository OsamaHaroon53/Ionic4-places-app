import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'My Places',
      url: '/bookings',
      icon: 'images'
    },
    {
      title: 'Discover Places',
      url: '/places/discover',
      icon: 'search'
    },
    {
      title: 'Account',
      url: '/places',
      icon: 'person'
    },
    {
      title: 'Help',
      url: '/places',
      icon: 'help-circle'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isLogin(){
    return this.auth.isLogin();
  }

  logOut(){
    this.auth.logOut();
    this.navCtrl.navigateRoot('/auth');
  }
}
