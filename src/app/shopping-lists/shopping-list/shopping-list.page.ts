import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { List } from 'src/app/model/list';
import { DBService } from 'src/app/services/db.service';

import { ToastController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
  animations: [
    trigger('buttons', [
      transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),
      animate('1s ease-in',
      style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
})

export class ShoppingListPage implements OnInit {
  list: List;
  selectedOptions: any[];
  selectedProducts: Product[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastController: ToastController,
              private dbService: DBService) {
                this.loadList();
  }

  ngOnInit() {
    this.loadSelected();
  }

  loadList() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.list = this.router.getCurrentNavigation().extras.state.list;
      } else {
        this.back();
      }
    });
  }

  loadSelected() {
    this.selectedProducts = this.list.products.filter(product => product.isChecked === true);
    this.dbService.update('/shoppingLists', this.list.uid, this.list);
  }

  selectAll() {
    if (this.selectedProducts.length === this.list.products.length) {
      this.list.products.map(product => product.isChecked = false);
    } else {
      this.list.products.map(product => product.isChecked = true);
    }
    this.loadSelected();
  }

  delete() {
    this.selectedOptions.forEach(item =>  {
      this.list.products = this.list.products.filter(product => product.uid !== item.uid);
      if (this.list.products.length === 0) {
        this.dbService.remove('/shoppingLists', this.list.uid).then(() => {
            this.presentToast('Lista apagada com sucesso');
            this.back();
        });
      }
    });
  }

  listPercentage(value: number) {
    let result: number;
    result = (value * 100 / this.list.products.length);
    return result.toString().length > 3 ? result.toFixed(1) : result;
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
}
