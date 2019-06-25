import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';

import { Category } from 'src/app/model/category';
import { Router, NavigationExtras } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  animations: [
    trigger('load', [
      transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),
      animate('0.8s cubic-bezier(.8, -0.6, 0.2, 1.5)',
      style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})

export class CategoriesPage implements OnInit {
  categories: Category[];
  loading: boolean;

  constructor(private dbService: DBService, private toastController: ToastController, private router: Router) {
    this.init();
  }

  ngOnInit() {
  }

  private async init() {
    this.loading = true;
    this.dbService.listAndWatch('/categories')
    .subscribe(() => this.loadCategories());
  }

  private async loadCategories() {
    this.dbService.listWithUIDs<Category>('/categories')
    .then(categories => {
      this.categories = categories;
      this.loading = false;
    }).catch(error => {
      console.log(error);
    });
  }

  remove(uid: string) {
    this.dbService.remove('/categories', uid)
    .then(() => {
      this.presentToast('Categoria removida com sucesso');
      this.loadCategories();
    });
  }

  edit(category: Category) {
    const navigationExtras: NavigationExtras = {
      state: {
        category
      }
    };
    this.router.navigate([`./categories/edit-category/:${category.name}`], navigationExtras);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
