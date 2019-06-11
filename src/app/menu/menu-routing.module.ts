import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: MenuPage,
        children: [
            { path: 'shopping-lists', children: [
                {
                    path: '',
                    loadChildren: './shopping-lists/shopping-lists.module#ShoppingListsPageModule'
                },
                {
                    path: 'new-list',
                    loadChildren: './shopping-lists/new-shopping-list/new-shopping-list.module#NewShoppingListPageModule'
                },
                {
                    path: 'edit/:list',
                    loadChildren: './shopping-lists/edit-shopping-list/edit-shopping-list.module#EditShoppingListPageModule'
                },
                {
                    path: 'details/:list',
                    loadChildren: './shopping-lists/shopping-list/shopping-list.module#ShoppingListPageModule'
                }
            ]},
            { path: 'products', children: [
                {
                    path: '', loadChildren: './products/products.module#ProductsPageModule'
                }
            ]},
            {   path: 'recipes', children: [
                {
                    path: '',
                    loadChildren: './recipes/recipes.module#RecipesPageModule'
                },
                {
                    path: 'new-recipe',
                    loadChildren: './recipes/new-recipe/new-recipe.module#NewRecipePageModule'
                },
                {
                    path: 'new-recipe/new-ingredient',
                    loadChildren: './recipes/new-recipe/new-ingredient/new-ingredient.module#NewIngredientPageModule'
                },
                {
                    path: 'edit-recipe',
                    loadChildren: './recipes/edit-recipe/edit-recipe.module#EditRecipePageModule'
                },
                {
                    path: 'details/:recipe',
                    loadChildren: './recipes/recipe/recipe.module#RecipePageModule'
                }
            ]},
            {   path: 'cart', children: [
                {
                    path: '',
                    loadChildren: './cart/cart.module#CartPageModule'
                }
            ]},
            {   path: 'historic', children: [
                {
                    path: '',
                    loadChildren: './historic/historic.module#HistoricPageModule'
                }
            ]},
            {
                path: '',
                redirectTo: '/menu/tabs/shopping-lists',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/menu/tabs/shopping-lists',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class MenuRoutingModule {}
