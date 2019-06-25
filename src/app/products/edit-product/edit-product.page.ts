import { Component } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { DBService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
  providers: [CameraService, Camera, Base64]
})
export class EditProductPage {
  product: Product;
  categories: Category[];
  loading: boolean;

  constructor(private dbService: DBService, public toastController: ToastController,
              private cameraService: CameraService, public router: Router, private route: ActivatedRoute) {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.loadCategories();
    this.loadProduct();
    this.loading = false;
  }

  loadProduct() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras.state.product));
      } else {
        this.back();
      }
    });
  }

  private async loadCategories() {
    this.loading = true;
    this.categories = await this.dbService.listWithUIDs<Category>('/categories');
    this.loading = false;
  }

  edit() {
    const productUpdated = {
      uid: this.product.uid,
      name: this.product.name,
      price: this.product.price,
      weight: this.product.weight,
      quantity:  this.product.quantity,
      measureUnit: this.product.measureUnit,
      image: this.getImage(),
      categoryUID: this.product.categoryUID
    };
    this.dbService.update('/products', this.product.uid, productUpdated)
      .then(() => {
        this.presentToast('Produto editado com sucesso');
        this.back();
      }).catch(error => {
        console.log(error);
      });
  }

  async takePhoto() {
    this.product.image = await this.cameraService.takePhoto();
  }

  getImage() {
    return this.product.image ? this.product.image : 'https://cdn.dribbble.com/users/226242/screenshots/5606713/camera_2x.png';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.router.navigate(['products']);
  }
}
