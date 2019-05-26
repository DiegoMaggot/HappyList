import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage {
  product: Product;
  loading: boolean;

  constructor(public modalController: ModalController, public toastController: ToastController) {}

  back() {
    this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
