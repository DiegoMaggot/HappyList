import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { List } from '../../../model/list';
import { Product } from '../../../model/product';
import { DBService } from '../../../services/db.service';
import { ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.page.html',
  styleUrls: ['./new-shopping-list.page.scss'],
})
export class NewShoppingListPage implements OnInit {
  loading: boolean;
  newList: List;
  newProduct: Product;
  products: Product[];
  newOption: boolean;
  selectOption: boolean;
  uidTemporary = 0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private dbService: DBService, public toastController: ToastController, private router: Router) {
    this.init();
  }

  ngOnInit() {
    this.newOption = false;
    this.selectOption = false;
    this.resetShopList();
  }

  private async init() {
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
    product.quantity = 0;
    product['uidTemporary'] = this.uidTemporary;
    if (this.validateProducts(product, this.newList.products)) {
      this.presentToast(`O produto ${product.name} já foi adicionado a sua lista`);
    } else {
      this.newList.products.push(product);
      this.resetItem();
      this.uidTemporary++;
      this.presentToast(`${product.name} adicionado a lista`);
    }
  }

  addQuantity(product: Product) {
    this.newList.products.forEach(item => {
      if (item['uidTemporary'] === product['uidTemporary']) {
        item.quantity++;
      }
    });
  }
  removeQuantity(product: Product) {
    this.newList.products.forEach(item => {
      if (item['uidTemporary'] === product['uidTemporary'] && item.quantity > 0) {
        item.quantity--;
      }
    });
  }

  deleteItem(product: Product) {
    this.newList.products = this.newList.products.filter(item => item['uidTemporary'] !== product['uidTemporary']);
    this.presentToast(`${product.name} removido da lista`);
  }

  validateProducts(product: Product, products: Product[]) {
    let exists = false;
    products.forEach(item => {
      if (item.name === product.name && item.weight === product.weight && item.measureUnit === product.measureUnit) {
        exists = true;
        }
    });
    return exists;
  }

  resetItem() {
    this.newProduct = new Product();
    this.newProduct.name = '';
  }
  resetShopList() {
    this.newList = new List();
    this.newList.products = new Array<Product>();
    this.newList.name = '';
  }

  registerProduct() {
    this.resetItem();
    this.newOption = this.newOption === false ? true : false;
    if (this.selectOption) { this.selectOption = false; }
  }
  selectProduct() {
    this.resetItem();
    this.selectOption = this.selectOption === false ? true : false;
    if (this.newOption) { this.newOption = false; }
  }

  saveList() {
    this.newList.products.forEach(product => {
      delete product['uidTemporary'];
      if (this.validateProducts(product, this.products)) {
          this.dbService.insertInList<Product>('/products', product)
        .then(() => {
        }).catch(error => {
          console.log(error);
        });
      }
    });
    this.dbService.insertInList<List>('/shoppingLists', this.newList)
      .then(() => {
        this.presentToast('lista salva com sucesso!');
        this.resetShopList();
        this.router.navigate(['./menu/tabs/shopping-lists']);
      }).catch(error => {
        console.log(error);
      });
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
}
