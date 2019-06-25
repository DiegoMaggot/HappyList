import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { DBService } from 'src/app/services/db.service';
import { Category } from 'src/app/model/category';

export class Icon {
  uid: string;
  name: string;
  icons: string[];
}

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})

export class NewCategoryPage {
  newCategory: Category;
  loading: boolean;
  iconList: Icon[];

  sliderConfig = {
    spaceBetwen: 5,
    centeredSlides: false,
    slidesPerView: 4,
    zoom: false
  };

  constructor(private router: Router, private dbService: DBService, public toastController: ToastController) {
    this.loadIcons();
    this.init();
  }

  init() {
    this.newCategory = new Category();
    this.newCategory.name = '';
  }

  private async loadIcons() {
    this.loading = true;
    this.dbService.listWithUIDs<Icon>('/icons')
      .then(icons => {
        this.iconList = icons;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  save() {
    this.dbService.insertInList<Category>('/categories', this.newCategory)
      .then(() => {
        this.presentToast('Categoria salva');
        this.back();
      }).catch(error => {
        console.log(error);
      });
  }

  selected(icon: string) {
    this.newCategory.icon = icon;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.router.navigate(['categories']);
    this.init();
  }
}
