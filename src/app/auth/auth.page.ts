import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = false;
  
  constructor(private auth: AuthService, private navctrl: NavController) { }

  ngOnInit() {
  }

  login(form: NgForm){
    // if(form.invalid){
    //   return;
    // }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email,password)
    this.auth.logIn();
    this.navctrl.navigateRoot('/places/discover');
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
