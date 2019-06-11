import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  newRecipe: Recipe;
  levels: string[] = ['Fácil', 'Médio', 'Dificil'];
  constructor(public router: Router) {
    this.init();
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['./menu/tabs/recipes']);
  }

  init() {
    this.newRecipe = new Recipe();
    this.newRecipe.name = '';
  }

  addIngredientPage() {
    this.router.navigate(['./menu/tabs/recipes/new-recipe/new-ingredient']);
  }
}
