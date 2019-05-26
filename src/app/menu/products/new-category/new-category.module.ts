import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewCategoryPage } from './new-category.page';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: NewCategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewCategoryPage]
})
export class NewCategoryPageModule {}
