import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = false;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private auth: AuthService, private navctrl: NavController) {
    auth.isLogin().subscribe(loggedIn=>{
      if(loggedIn){
        navctrl.navigateRoot('/places');
      }
    })
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent'
    }).then(loading=>{
      loading.present();
      const email = form.value.email;
      const password = form.value.password;
      this.auth[this.isLogin ? 'signUp' : 'logIn'](email, password).subscribe(res => {
        console.log(res);
        this.auth.setUser(res as any);
        this.navctrl.navigateRoot('/places/discover');
        loading.dismiss();
      }, err => {
        loading.dismiss();
        console.log('err:', err);
        this.alertCtrl.create({
          header: 'Authentication Error',
          // subHeader: 'Subtitle',
          message: err.error.error.message,
          buttons: ['OK']
        }).then(el => {
          el.present();
        });
      });
    })
  }

  onSwitchAuthMode(form: NgForm) {
    form.reset();
    this.isLogin = !this.isLogin;
  }

}
