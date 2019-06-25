import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router } from '@angular/router';

import { DBService } from 'src/app/services/db.service';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  providers: [CameraService, Camera, Base64]
})
export class NewProductPage {
  newProduct: Product;
  editProduct: Product;
  categories: Category[];
  addCategory: boolean;

  constructor(private dbService: DBService, public toastController: ToastController,
              private cameraService: CameraService, public router: Router) {
    this.newProduct = new Product();
    this.loadCategories();
  }

  private async loadCategories() {
    this.categories = await this.dbService.listWithUIDs<Category>('/categories');
  }

  save() {
    this.newProduct.quantity = 1;
    this.dbService.insertInList<Product>('/products', this.newProduct)
      .then(() => {
        this.presentToast('Produto salvo com sucesso!');
        this.back();
      }).catch(error => {
        console.log(error);
      });
  }

  async takePhoto() {
    this.newProduct.image = await this.cameraService.takePhoto();
  }

  getImage() {
    return this.newProduct.image ? this.newProduct.image : 'https://cdn.dribbble.com/users/226242/screenshots/5606713/camera_2x.png';
  }

  back() {
    this.router.navigate(['./products']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
