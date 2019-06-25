import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router, public toastController: ToastController,
              private afAuth: AngularFireAuth, public menuCtrl: MenuController) {
                this.menuCtrl.enable(false);
  }

  email: string;
  password: string;
  tentativas = 0;

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/shopping-lists']);
      }).catch(() => {
        this.tentativas++;
        this.presentToast('E-mail e/ou senha inválido(s).');
        delete this.password;
      });
  }

  register() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
