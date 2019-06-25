import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { List } from 'src/app/model/list';
import { ToastController } from '@ionic/angular';
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
  products: Product[];
  selectedProduct: Product;

  constructor(private dbService: DBService, public toastController: ToastController, private router: Router) {
    this.init();
  }

  init() {
    this.resetShopList();
    this.loadProductsList();
  }

  private async loadProductsList() {
    this.loading = true;
    this.dbService.listAndWatch('/products')
    .subscribe(() => this.loadProducts());
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
      this.newList.products.push(product);
      this.presentToast(`"${product.name}" foi adicionado a lista`);
    }
  }

  saveList() {
    this.newList.favorite = false;
    this.dbService.insertInList<List>('/shoppingLists', this.newList)
      .then(() => {
        this.presentToast('lista salva com sucesso!');
        this.init();
        this.router.navigate(['./shopping-lists']);
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.router.navigate(['./shopping-lists']);
  }

  ngOnInit() {
  }
}
