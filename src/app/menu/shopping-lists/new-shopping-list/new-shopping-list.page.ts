import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.page.html',
  styleUrls: ['./new-shopping-list.page.scss'],
})
export class NewShoppingListPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['./menu/tabs/shopping-lists']);
  }
}
