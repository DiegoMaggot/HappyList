import { Component, OnInit } from '@angular/core';
import { List } from '../../model/list';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})

export class ShoppingListsPage implements OnInit {
  favorite: string;
  loading: boolean;
  loadList: boolean;
  selectedOptions: any[];
  lists: List[];

  constructor(private dbService: DBService) {
    this.init();
    this.favorite = 'favorite_border';
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

  setFavorite() {
    this.favorite = this.favorite === 'favorite_border' ? 'favorite' : 'favorite_border';
  }

  ngOnInit() {
  }

  delete() {
    console.table(this.selectedOptions);
  }
}
