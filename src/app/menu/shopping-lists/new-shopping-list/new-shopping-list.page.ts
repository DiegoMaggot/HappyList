import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { List } from 'src/app/model/list';
import { ToastController, ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { NewProductPage } from './new-product/new-product.page';
import { Product } from 'src/app/model/product';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.page.html',
  styleUrls: ['./new-shopping-list.page.scss']
})

export class NewShoppingListPage implements OnInit {
  loading: boolean;
  newList: List;
  newProduct: Product;
  products: Product[];
  selectOption: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
// tslint:disable-next-line: max-line-length
  constructor(private dbService: DBService, public toastController: ToastController, private router: Router, public modalController: ModalController) {
    this.init();
  }

  init() {
    this.initData();
    this.loadProductsList();
  }

  initData() {
    this.selectOption = false;
    this.newProduct = new Product();
    this.resetShopList();
  }

  private async loadProductsList() {
    this.loading = true;
    this.dbService.listAndWatch('/products')
    .subscribe(data => this.loadProducts());
  }

  private async loadProducts() {
    this.dbService.listWithUIDs<Product>('/products')
    .then(products => {
      this.products = products;
      this.loading = false;
    }).catch(error => {
      console.log(error);
    });
  }

  addProduct(product: Product) {
    if (this.validateProducts(product, this.newList.products)) {
      this.presentToast(`O produto "${product.name}" já foi adicionado a sua lista`);
    } else {
      console.log(product.quantity);
      this.newList.products.push(product);
      this.newProduct = new Product();
      this.presentToast(`"${product.name}" foi adicionado a lista`);
    }
    if (this.products.length === 0) {
      this.selectOption = false;
    }
  }

  async createProduct() {
    const modal = await this.modalController.create({
      component: NewProductPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.addProduct(this.products[this.products.length - 1]);
        }
      });
    return  await modal.present();
  }

  saveList() {
    this.newList.favorite = false;
    this.dbService.insertInList<List>('/shoppingLists', this.newList)
      .then(() => {
        this.presentToast('lista salva com sucesso!');
        this.init();
        this.router.navigate(['./menu/tabs/shopping-lists']);
      }).catch(error => {
        console.log(error);
      });
  }

  validateProducts(product: Product, products: Product[]) {
    let exists = false;
    products.forEach(item => {
      if (item.uid === product.uid) {
        exists = true;
      }
    });
    return exists;
  }

  setQuantity(product: Product, some: boolean) {
    this.newList.products.forEach(item => {
      if (item.uid === product.uid) {
        if (some) {
          item.quantity++;
        } else if (!some && item.quantity > 1) {
          item.quantity--;
        }
      }
    });
  }

  deleteItem(product: Product) {
    this.newList.products = this.newList.products.filter(item => item.uid !== product.uid);
    this.presentToast(`${product.name} removido da lista`);
  }

  resetShopList() {
    this.newList = new List();
    this.newList.products = new Array<Product>();
    this.newList.name = '';
  }

  selectProduct() {
    this.selectOption = this.selectOption === false ? true : false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.router.navigate(['./menu/tabs/shopping-lists']);
  }

  ngOnInit() {
  }
}
