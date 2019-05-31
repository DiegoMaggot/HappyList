import { Component } from '@angular/core';
import { List } from '../../model/list';
import { DBService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
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

export class ShoppingListsPage {
  loading: boolean;
  lists: List[];
  constructor(private dbService: DBService, private toastController: ToastController, private router: Router) {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.dbService.listAndWatch('/shoppingLists')
    .subscribe(data => this.loadLists());
  }

  private async loadLists() {
    this.dbService.listWithUIDs<List>('/shoppingLists')
    .then(lists => {
      this.lists = lists;
      this.loading = false;
    }).catch(error => {
      console.log(error);
    });
  }

  setFavorite(list: List) {
    list.favorite = list.favorite === false ? true : false;
    this.dbService.update('/shoppingLists', list.uid, list)
    .then(() => {
      if (list.favorite) {
        this.presentToast(`a lista "${list.name}" foi adicionada as favoritas`);
      } else {
        this.presentToast(`a lista "${list.name}" foi removida das favoritas`);
      }
    }).catch(error => {
        console.log(error);
    });
  }

  getQuantity(list: List) {
    return list.products.map(product => product.quantity).reduce(((totalQuantity, quantity) => totalQuantity += quantity));
  }

  remove(uid: string) {
    this.dbService.remove('/shoppingLists', uid)
    .then(() => {
      this.presentToast('Produto removido com sucesso');
      this.loadLists();
    });
  }

  goTo(path: string, list: List) {
    const navigationExtras: NavigationExtras = {
      state: {
        list
      }
    };
    this.router.navigate([`./menu/tabs/shopping-lists/${path}/:${list.name}`], navigationExtras);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
