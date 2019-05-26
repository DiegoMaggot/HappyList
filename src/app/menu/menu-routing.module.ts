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
                    path: 'new-shopping-list',
                    loadChildren: './shopping-lists/new-shopping-list/new-shopping-list.module#NewShoppingListPageModule'
                },
                {
                    path: 'edit-shopping-list',
                    loadChildren: './shopping-lists/edit-shopping-list/edit-shopping-list.module#EditShoppingListPageModule'
                }
                // {
                //     path: ':listId',
                //     loadChildren: './shopping-lists/shopping-list/shopping-list.module#ShoppingListPageModule'
                // }
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
                    path: 'edit-recipe',
                    loadChildren: './recipes/edit-recipe/edit-recipe.module#EditRecipePageModule'
                }
                // {
                //     path: ':recipeId',
                //     loadChildren: './recipes/recipe/recipe.module#RecipePageModule'
                // }
            ]},
            {   path: 'products', children: [
                {
                    path: '',
                    loadChildren: './products/products.module#ProductsPageModule'
                },
                {
                    path: 'new-product',
                    loadChildren: './products/new-product/new-product.module#NewProductPageModule'
                },
                {
                    path: 'edit-product',
                    loadChildren: './products/edit-product/edit-product.module#EditProductPageModule'
                }
                // {
                //     path: ':productId',
                //     loadChildren: './products/product/product.module#ProductPageModule'
                // }
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
