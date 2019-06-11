import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private auth: AuthService, private navctrl: NavController) { }

  ngOnInit() {
  }

  login(){
    this.auth.logIn();
    this.navctrl.navigateRoot('/places/discover');
  }

}
