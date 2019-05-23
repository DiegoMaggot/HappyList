import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { DBService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  newProduct: Product;
  categories: Category[];
  newCategory: Category;
  addCategory: boolean;

  constructor(private dbService: DBService, public toastController: ToastController) {
    this.newProduct = new Product();
    this.newCategory = new Category();
    this.loadCategories();
  }

  private async loadCategories() {
    this.categories = await this.dbService.listWithUIDs<Category>('/categories');
  }

  save() {
    // if (this.editProduct) {
    //   this.edit();
    // } else {
      this.insert();
    // }
  }

  private insert() {
    this.newProduct.image = 'https://cdn.dribbble.com/users/1626229/screenshots/6467647/the-wind-of-change.jpg';
    this.dbService.insertInList<Product>('/products', this.newProduct)
      .then(() => {
        this.presentToast('Produto salvo com sucesso!');
      }).catch(error => {
        console.log(error);
      });
  }

  // private edit() {
  //   const productUpdated = {
  //     uid: this.newProduct.uid,
  //     name: this.newProduct.name,
  //     price: this.newProduct.price,
  //     weight: this.newProduct.weight,
  //     measureUnit: this.newProduct.measureUnit,
  //     quantity: this.newProduct.quantity,
  //     image: this.newProduct.image,
  //     categoryUID: this.newProduct.categoryUID
  //   };
  //   this.dbService.update('/products', this.newProduct.uid, productUpdated)
  //     .then(() => {
  //       this.presentToast('')
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }

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

  // back() {
  //   this.modalController.dismiss();
  // }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    // if (this.editProduct) {
    //   this.newProduct = JSON.parse(JSON.stringify(this.editProduct));
    // }
  }
}
