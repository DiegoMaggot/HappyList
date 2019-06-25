import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { List } from 'src/app/model/list';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.page.html',
  styleUrls: ['./edit-shopping-list.page.scss']
})

export class EditShoppingListPage implements OnInit {
  loading: boolean;
  newList: List;
  products: Product[];
  selectedProduct: Product;

  constructor(private dbService: DBService, public toastController: ToastController,
              private router: Router, private route: ActivatedRoute) {
    this.init();
  }

  init() {
    this.loading = true;
    this.selectedProduct = new Product();
    this.loadList();
    this.loadProductsList();
    this.loading = false;
  }

  loadList() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.newList = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras.state.list));
      } else {
        this.back();
      }
    });
  }

  private async loadProductsList() {
    this.dbService.listAndWatch('/products')
    .subscribe(() => this.loadProducts());
  }

  private async loadProducts() {
    this.dbService.listWithUIDs<Product>('/products')
    .then(products => {
      this.products = products;
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

  updateList() {
    this.dbService.update('/shoppingLists', this.newList.uid, this.newList)
      .then(() => {
        this.presentToast('lista atualizada com sucesso!');
        this.back();
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.router.navigate(['shopping-lists']);
  }

  ngOnInit() {
  }
}
