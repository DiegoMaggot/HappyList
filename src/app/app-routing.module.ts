import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'shopping-lists', loadChildren: './menu/shopping-lists/shopping-lists.module#ShoppingListsPageModule' },
  { path: 'shopping-list', loadChildren: './menu/shopping-lists/shopping-list/shopping-list.module#ShoppingListPageModule' },
  { path: 'new-shopping-list', loadChildren: './menu/shopping-lists/new-shopping-list/new-shopping-list.module#NewShoppingListPageModule' },
  { path: 'edit-shopping-list', loadChildren: './menu/shopping-lists/edit-shopping-list/edit-shopping-list.module#EditShoppingListPageModule' },
  { path: 'recipes', loadChildren: './menu/recipes/recipes.module#RecipesPageModule' },
  { path: 'recipe', loadChildren: './menu/recipes/recipe/recipe.module#RecipePageModule' },
  { path: 'new-recipe', loadChildren: './menu/recipes/new-recipe/new-recipe.module#NewRecipePageModule' },
  { path: 'edit-recipe', loadChildren: './menu/recipes/edit-recipe/edit-recipe.module#EditRecipePageModule' },
  { path: 'products', loadChildren: './menu/products/products.module#ProductsPageModule' },
  { path: 'product', loadChildren: './menu/products/product/product.module#ProductPageModule' },
  { path: 'new-product', loadChildren: './menu/products/new-product/new-product.module#NewProductPageModule' },
  { path: 'edit-product', loadChildren: './menu/products/edit-product/edit-product.module#EditProductPageModule' },
  { path: 'cart', loadChildren: './menu/cart/cart.module#CartPageModule' },
  { path: 'historic', loadChildren: './menu/historic/historic.module#HistoricPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
