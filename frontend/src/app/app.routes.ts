import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../app/pages/home/home').then(mod => mod.Home) },
  { path: 'products', loadComponent: () => import('../app/pages/products/products').then(mod => mod.Products) },
  { path: 'cart', loadComponent: () => import('../app/pages/cart/cart').then(mod => mod.CartComponent) },
];
