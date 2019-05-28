import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../../../model/list';
import { Product } from '../../../model/product';
import { DBService } from '../../../services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.page.html',
  styleUrls: ['./new-shopping-list.page.scss'],
})

export class NewShoppingListPage implements OnInit {
  newList: List;
  newProduct: Product;
  products: Product[];
  newOption: boolean;
  constructor(private dbService: DBService,
              public toastController: ToastController,
              private router: Router) {
    this.newOption = false;
    this.newList = new List();
    this.newProduct = new Product();
    this.newList.products = new Array<Product>();
    this.newList.name = '';
    this.newProduct.name = '';
  }

  ngOnInit() {
  }

  addProduct(product: Product) {
    product.quantity = 0;
    this.newList.products.push(product);
    this.newProduct = new Product();
    this.newProduct.name = '';
  }

  addQuantity(product: Product) {
    this.newList.products.forEach(item => {
      if (item.name === product.name) {
        item.quantity++;
      }
    });
  }
  removeQuantity(product: Product) {
    this.newList.products.forEach(item => {
      if (item.name === product.name && item.quantity > 0) {
        item.quantity--;
      }
    });
  }
  deleteItem(product: Product) {
    this.newList.products = this.newList.products.filter(item => item.name !== product.name);
  }
  back() {
    this.router.navigate(['./menu/tabs/shopping-lists']);
  }

  registerProduct() {
    this.newOption = this.newOption === false ? true : false;
  }

  saveList() {
    this.newList.products.forEach(product => {
      this.dbService.insertInList<Product>('/products', product)
      .then(() => {
      }).catch(error => {
        console.log(error);
      });
    });
    this.dbService.insertInList<List>('/shoppingLists', this.newList)
      .then(() => {
        this.presentToast('lista salva com sucesso!');
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
}
