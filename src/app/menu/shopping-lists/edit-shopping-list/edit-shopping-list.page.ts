import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { List } from '../../../model/list';
import { Product } from '../../../model/product';
import { DBService } from '../../../services/db.service';
import { ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.page.html',
  styleUrls: ['./edit-shopping-list.page.scss']
})
export class EditShoppingListPage implements OnInit {
  loading: boolean;
  newList: List;
  newProduct: Product;
  products: Product[];
  newOption: boolean;
  selectOption: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private dbService: DBService, public toastController: ToastController, private router: Router, private route: ActivatedRoute
    ) {
    this.init();
  }

  init() {
    this.loadList();
    this.initData();
    this.loadProductsList();
  }
  initData() {
    this.newOption = false;
    this.selectOption = false;
    this.resetItem();
  }

  loadList() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.newList = this.router.getCurrentNavigation().extras.state.list;
      } else {
        this.back();
      }
    });
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

  saveAndAddProduct() {
    if (!this.validateProducts(this.newProduct, this.products)) {
      this.dbService.insertInList<Product>('/products', this.newProduct)
      .then(() => {
        this.newProduct = this.products[this.products.length - 1];
        this.addProduct(this.newProduct);
      }).catch(error => {
        console.log(error);
      });
    } else {
      const productFiltered = this.products.filter(product => {
        if (this.newProduct.name === product.name
          && this.newProduct.weight === product.weight
          && this.newProduct.measureUnit === product.measureUnit) {
          return true;
        } else {
          return false;
        }
      })[0];
      this.addProduct(productFiltered);
    }
  }

  addProduct(product: Product) {
    if (this.validateProducts(product, this.newList.products)) {
      this.presentToast(`O produto "${product.name}" já foi adicionado a sua lista`);
    } else {
      this.newList.products.push(product);
      this.products = this.products.filter(item => item.uid !== product.uid);
      this.resetItem();
      this.presentToast(`"${product.name}" foi adicionado a lista`);
    }
    if (this.products.length === 0) {
      this.selectOption = false;
    }
  }

  updateList() {
    this.dbService.update('/shoppingLists', this.newList.uid, this.newList)
      .then(() => {
        this.presentToast('lista atualizada com sucesso!');
        this.router.navigate(['./menu/tabs/shopping-lists']);
      }).catch(error => {
        console.log(error);
      });
  }

  validateProducts(product: Product, products: Product[]) {
    let exists = false;
    products.forEach(item => {
      if (item.name.toLowerCase() === product.name.toLowerCase()
      && item.weight === product.weight && item.measureUnit === product.measureUnit) {
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
    if (product.uid !== undefined) {
      this.products.push(product);
    }
    this.presentToast(`${product.name} removido da lista`);
  }

  resetItem() {
    this.newProduct = new Product();
    this.newProduct.name = '';
    this.newProduct.quantity = 1;
    this.newProduct.isChecked = false;
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
