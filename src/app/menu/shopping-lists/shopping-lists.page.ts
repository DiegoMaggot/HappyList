import { Component, OnInit } from '@angular/core';
import { List } from '../../model/list';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})
export class ShoppingListsPage implements OnInit {
  lists: List[];
  constructor() { }

  ngOnInit() {
  }

}
