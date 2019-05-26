import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipePage } from './recipe/recipe.page';
import { Recipe } from 'src/app/model/recipe';
import { Ingredient } from 'src/app/model/ingredient';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async details(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: RecipePage,
      componentProps: {
        recipe
      }
    });
    return await modal.present();
  }
}
