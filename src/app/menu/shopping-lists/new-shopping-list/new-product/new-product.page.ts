import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { DBService } from 'src/app/services/db.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  providers: [CameraService, Camera, Base64],
})
export class NewProductPage implements OnInit {
  newProduct: Product;
  editProduct: Product;
  categories: Category[];
  newCategory: Category;
  addCategory: boolean;

// tslint:disable-next-line: max-line-length
  constructor(public modalController: ModalController,
              private dbService: DBService,
              public toastController: ToastController,
              private cameraService: CameraService) {
    this.newProduct = new Product();
    this.newCategory = new Category();
    this.loadCategories();
  }

  ngOnInit() {
    if (this.editProduct) {
      this.newProduct = JSON.parse(JSON.stringify(this.editProduct));
    }
  }

  private async loadCategories() {
    this.categories = await this.dbService.listWithUIDs<Category>('/categories');
  }

  save() {
    if (this.editProduct) {
      this.edit();
    } else {
      this.insert();
    }
  }

  private insert() {
    this.newProduct.quantity = 1;
    this.dbService.insertInList<Product>('/products', this.newProduct)
      .then(() => {
        this.presentToast('Produto salvo com sucesso!');
        this.modalController.dismiss(this.newProduct);
      }).catch(error => {
        console.log(error);
      });
  }

  private edit() {
    const productUpdated = {
      uid: this.newProduct.uid,
      name: this.newProduct.name,
      price: this.newProduct.price,
      weight: this.newProduct.weight,
      measureUnit: this.newProduct.measureUnit,
      image: this.newProduct.image,
      categoryUID: this.newProduct.categoryUID
    };
    this.dbService.update('/products', this.newProduct.uid, productUpdated)
      .then(() => {
        this.presentToast('Produto editado com sucesso');
        this.modalController.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  async takePhoto() {
    this.newProduct.image = await this.cameraService.takePhoto();
  }

  categoryRegister() {
    if (this.addCategory) {
      this.addCategory = false;
    } else {
      this.addCategory = true;
    }
  }

  cancelCategoryRegister() {
    this.addCategory = false;
  }

  insertCategory() {
    this.dbService.insertInList<Category>('/categories', this.newCategory)
      .then(() => {
        this.presentToast('Categoria salva');
        this.loadCategories();
        this.newCategory = new Category();
        this.addCategory = false;
      }).catch(error => {
        console.log(error);
      });
  }
  getImage() {
    return this.newProduct.image ? this.newProduct.image : 'https://cdn.dribbble.com/users/226242/screenshots/5606713/camera_2x.png';
  }

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
