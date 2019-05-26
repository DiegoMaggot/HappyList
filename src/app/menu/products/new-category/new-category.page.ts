import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/model/category';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})

export class NewCategoryPage implements OnInit {
  newCategory: Category;
  editCategory: Category;
  show: boolean;
  sliderConfig = {
    spaceBetwen: 5,
    centeredSlides: false,
    slidesPerView: 5,
    zoom: false
  };
  icons: string[] = ['bar', 'champagne', 'wine-glass', 'wine-bottle', 'cocktail', 'vodka',
  'whiskey', 'alcohol', 'beer', 'wooden-beer-keg', 'cafe', 'tea', 'coffee', 'coffee-to-go', 'milk',
  'bottle-of-water', 'juice-bottle', 'orange-soda', 'soda-water', 'bread', 'baguette', 'naan',
  'bread-and-rolling-pin', 'grapes', 'strawberry', 'raspberry', 'cherry', 'banana-split', 'ice-cream-cone',
  'ice-cream-sundae', 'chocolate-bar', 'topping', 'jam', 'chocolate-truffle', 'cheese', 'tin-can',
  'tapas', 'pancake', 'american-pancakes', 'rice-bowl', 'porridge', 'italian-pizza', 'salami-pizza',
  'hamburger', 'kfc-chicken', 'apple', 'cinnamon-sticks', 'vegan-food', 'vegetarian-food', 'natural-food',
  'birthday-cake', 'pie', 'cupcake', 'cookies', 'cake', 'fish-food', 'carrot', 'tomato', 'eggplant',
  'celery', 'edit', 'pencil', 'ball-point-pen', 'marker-pen',  'ruler', 'paint', 'eraser', 'drafting-compass',
  'shredder', 'print', 'paper', 'spiral-bound-booklet', 'trash-can', 'waste', 'cut', 'paste',
  'trophy', 'medal-first-place', 'basketball', 'bowling', 'bowling-ball', 'bowling-pins', 'tennis-racquet', 'soccer-ball',
  'finish-flag', 'dumbbell', 'towel', 'bath', 'soap', 'bathtub', 'shower', 'toothpaste', 'water-pipe',
  'bed', 'single-bed', 'table', 'armchair', 'sofa', 'wardrobe', 'bureau', 'hair-dryer', 'office-phone', 'washing-machine',
  'iron', 'lamp', 'fire-extinguisher', 'air-conditioner', 'light', 'spiral-bulb', 'fluorescent-bulb',
  'mirrored-reflector-bulb'
];

  constructor(private dbService: DBService, public modalController: ModalController,  public toastController: ToastController) {
    this.newCategory = new Category();
    this.newCategory.name = '';
    this.newCategory.description = '';
    this.show = false;
  }

  save() {
    if (this.editCategory) {
      this.edit();
    } else {
      this.insert();
    }
  }

  private insert() {
    this.dbService.insertInList<Category>('/categories', this.newCategory)
      .then(() => {
        this.presentToast('Categoria salva com sucesso!');
        this.modalController.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  private edit() {
    const categoryUpdated = {
      uid: this.newCategory.uid,
      name: this.newCategory.name,
      description: this.newCategory.description,
      icon: this.newCategory.icon
    };
    this.dbService.update('/categories', this.newCategory.uid, categoryUpdated)
      .then(() => {
        this.presentToast('Categoria Atualizada');
      }).catch(error => {
        console.log(error);
      });
  }

  back() {
    this.modalController.dismiss();
  }

  showIcons() {
    this.show = this.show === true ? false : true;
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  setIcon(icon: string) {
    this.newCategory.icon = icon;
  }
  ngOnInit() {
  }

}
