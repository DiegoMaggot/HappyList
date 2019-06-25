import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  email: string;
  password: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, public toastController: ToastController) { }

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.presentToast('Usuário cadastrado com sucesso');
        this.backToLogin();
      })
      .catch(error => {
        this.presentToast('Erro ao cadastrar usuário');
        console.log(error);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}
