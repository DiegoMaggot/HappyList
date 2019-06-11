import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.page.html',
  styleUrls: ['./new-ingredient.page.scss'],
})
export class NewIngredientPage implements OnInit {
  newIngredient: Ingredient;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['./menu/tabs/recipes/new-recipe']);
  }
}
