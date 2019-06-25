import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { DBService } from 'src/app/services/db.service';
import { Category } from 'src/app/model/category';

export class Icon {
  uid: string;
  name: string;
  icons: string[];
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage {
  category: Category;
  loading: boolean;
  iconList: Icon[];

  sliderConfig = {
    spaceBetwen: 5,
    centeredSlides: false,
    slidesPerView: 4,
    zoom: false
  };

  constructor(private route: ActivatedRoute, private router: Router,
              private dbService: DBService, public toastController: ToastController) {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.loadCategory();
    this.loadIcons();
    this.loading = false;
  }

  loadCategory() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras.state.category));
      } else {
        this.back();
      }
    });
  }

  private async loadIcons() {
    this.dbService.listWithUIDs<Icon>('/icons')
      .then(icons => {
        this.iconList = icons;
      }).catch(error => {
        console.log(error);
      });
  }

  edit() {
      const categoryUpdated = {
        uid: this.category.uid,
        name: this.category.name,
        icon: this.category.icon,
      };
      this.dbService.update('/categories', this.category.uid, categoryUpdated)
        .then(() => {
          this.presentToast('Categoria editada com sucesso');
          this.back();
        }).catch(error => {
          console.log(error);
        });
    }

  selected(icon: string) {
    this.category.icon = icon;
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
  }
}
