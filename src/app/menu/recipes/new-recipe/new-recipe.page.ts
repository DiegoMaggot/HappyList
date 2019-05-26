import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['./menu/tabs/recipes']);
  }
}
