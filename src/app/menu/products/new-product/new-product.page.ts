import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { Product } from '../../../model/product';
import { DBService } from '../../../services/db.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewCategoryPage } from '../new-category/new-category.page';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  newProduct: Product;
  categories: Category[];
  loadList: boolean;
  constructor(private dbService: DBService,
              public toastController: ToastController,
              private router: Router,
              private modalController: ModalController) {
    this.newProduct = new Product();
    this.newProduct.name = '';
    this.init();
  }

  private async init() {
    this.dbService.listAndWatch('/categories')
    .subscribe(data => this.loadData());
  }

  private async loadData() {
    if (!this.loadList) {
      this.loadList = true;
      await this.loadCategories();
      this.loadList = false;
    }
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
        this.router.navigate(['./menu/tabs/products']);
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

  back() {
    this.router.navigate(['./menu/tabs/products']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async newCategoryPage() {
    const modal = await this.modalController.create({
      component: NewCategoryPage,
      componentProps: {
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    // if (this.editProduct) {
    //   this.newProduct = JSON.parse(JSON.stringify(this.editProduct));
    // }
  }
}
