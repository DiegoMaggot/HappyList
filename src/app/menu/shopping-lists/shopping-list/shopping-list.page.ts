import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/model/list';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { DBService } from 'src/app/services/db.service';

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
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('1.5s ease-in',
        style({ transform: 'scale(0)', opacity: 0 }))
        ])
    ])
  ],
})

export class ShoppingListPage implements OnInit {
  list: List;
  selectedOptions: any[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastController: ToastController,
              private dbService: DBService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.list = this.router.getCurrentNavigation().extras.state.list;
      } else {
        this.router.navigate(['./menu/tabs/shopping-lists']);
      }
    });
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

  back() {
    this.router.navigate(['./menu/tabs/shopping-lists']);
  }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
