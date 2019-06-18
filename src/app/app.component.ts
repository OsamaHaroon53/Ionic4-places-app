import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { Plugins, Capacitor  } from '@capacitor/core'
import { AuthService } from './providers/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Discover Places',
      url: '/places/discover',
      icon: 'search'
    },
    {
      title: 'My Booking',
      url: '/bookings',
      icon: 'images'
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
  loggedIn: boolean = false;
  

  constructor(
    private platform: Platform,
    private auth: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
    this.bacKButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.checkLoginStatus();
      if(Capacitor.isPluginAvailable('SplashScreen')){
        console.log('splash ok')
        Plugins.SplashScreen.hide();
      }
    });
  }

  // checkLoginStatus(){
  //   this.auth.isLogin().subscribe(isloggedIn=>{
  //     console.log(isloggedIn);
  //     this.loggedIn = isloggedIn;
  //   });
  // }

  getEmail(){
    return this.auth.getEmail()
  }

  logOut(){
    this.auth.logOut();
    this.navCtrl.navigateRoot('/auth');
  }

  bacKButtonEvent(){
    this.platform.backButton.subscribe(async () => {
      if (
        (this.router.isActive('/auth', true) && this.router.url === '/auth') ||
        (this.router.isActive('/places/discover', true) && this.router.url === '/places/discover') ||
        (this.router.isActive('/places/offers', true) && this.router.url === '/places/offers') ||
        (this.router.isActive('/bookings', true) && this.router.url === '/bookings')
      ) {
        navigator['app'].exitApp();
      }
    });
  }
}
