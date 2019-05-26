import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewProductPage } from './new-product.page';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NewCategoryPage } from '../new-category/new-category.page';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: NewProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewProductPage, NewCategoryPage],
  entryComponents: [NewCategoryPage]
})
export class NewProductPageModule {}
