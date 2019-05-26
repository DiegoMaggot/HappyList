import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  constructor(private modalController: ModalController) { }

  back() {
    this.modalController.dismiss();
  }
  
  ngOnInit() {
  }
}
