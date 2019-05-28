import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewShoppingListPage } from './new-shopping-list.page';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: '',
    component: NewShoppingListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewShoppingListPage]
})
export class NewShoppingListPageModule {}
