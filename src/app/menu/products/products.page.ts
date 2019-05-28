import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { DBService } from 'src/app/services/db.service';
import { ProductPage } from './product/product.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  products: Product[];
  categories: Category[];
  loading: boolean;
  sliderConfig = {
    spaceBetwen: 5,
    centeredSlides: true,
    slidesPerView: 1.2,
    zoom: false
  };
  constructor(public modalController: ModalController, private dbService: DBService, public toastController: ToastController) {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.dbService.listAndWatch('/categories')
    .subscribe(data => this.loadCategories());
    this.dbService.listAndWatch('/products')
    .subscribe(data => this.loadProducts());
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

  async details(product: Product) {
    const modal = await this.modalController.create({
      component: ProductPage,
      componentProps: {
        product
      }
    });
    return await modal.present();
  }
  ngOnInit() {
  }
}
