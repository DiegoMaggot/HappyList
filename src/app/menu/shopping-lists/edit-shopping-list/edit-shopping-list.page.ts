import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/model/list';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.page.html',
  styleUrls: ['./edit-shopping-list.page.scss'],
})
export class EditShoppingListPage implements OnInit {
  list: List;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.list = this.router.getCurrentNavigation().extras.state.list;
      }
    });
  }

  back() {
    this.router.navigate(['./menu/tabs/shopping-lists']);
  }

  ngOnInit() {
  }
}
