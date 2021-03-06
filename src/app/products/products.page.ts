import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { DBService } from 'src/app/services/db.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  products: Product[];
  categories: Category[];
  loading: boolean;
  loadList: boolean;

  constructor(private dbService: DBService, public toastController: ToastController, private router: Router) {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.dbService.listAndWatch('/categories')
    .subscribe(() => this.loadData());
    this.dbService.listAndWatch('/products')
    .subscribe(() => this.loadData());
  }

  private async loadData() {
    if (!this.loadList) {
      this.loadList = true;
      await this.loadCategories();
      await this.loadProducts();
      this.loadList = false;
    }
  }

  private async loadProducts() {
    this.dbService.listWithUIDs<Product>('/products')
    .then(products => {
      this.products = products;
      this.associateCategoryWithProduct();
      this.loading = false;
    }).catch(error => {
      console.log(error);
    });
  }

  private async loadCategories() {
    this.categories = await this.dbService.listWithUIDs<Category>('/categories');
  }

  private associateCategoryWithProduct() {
    this.products.forEach(product => {
      const category = this.categories.filter(cat => cat.uid === product.categoryUID)[0];
      product['category'] = category.name;
    });
  }

  remove(uid: string) {
    this.dbService.remove('/products', uid)
    .then(() => {
      this.presentToast('Produto removido com sucesso');
      this.loadProducts();
    });
  }

  edit(product: Product) {
    const navigationExtras: NavigationExtras = {
      state: {
        product
      }
    };
    this.router.navigate([`./products/edit-product/:${product.name}`], navigationExtras);
  }

  getImage(product: Product) {
    return product.image ? product.image : 'https://cdn.dribbble.com/users/226242/screenshots/5606713/camera_2x.png';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  search(event) {
    const searchTerm = event.srcElement.value;
    if (searchTerm) {
      this.associateCategoryWithProduct();
      this.products = this.products.filter(product => {
        const category = this.categories.filter(cat => cat.uid === product.categoryUID)[0];
        if (product.name && searchTerm || category.name && searchTerm) {
          if (product.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 ||
          category.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    } else {
      this.loadProducts();
    }
  }

  ngOnInit() {
  }
}
