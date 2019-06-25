import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'shopping-lists', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'products', children: [
        {
            path: '', loadChildren: './products/products.module#ProductsPageModule'
        },
        {
            path: 'new-product', loadChildren: './products/new-product/new-product.module#NewProductPageModule'
        },
        {
            path: 'edit-product/:product', loadChildren: './products/edit-product/edit-product.module#EditProductPageModule'
        }]
    },
    { path: 'categories', children: [
        {
            path: '',
            loadChildren: './categories/categories.module#CategoriesPageModule'
        },
        {
            path: 'new-category',
            loadChildren: './categories/new-category/new-category.module#NewCategoryPageModule'
        },
        {
            path: 'edit-category/:category',
            loadChildren: './categories/edit-category/edit-category.module#EditCategoryPageModule'
        }]
    },
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
        }]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
