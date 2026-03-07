import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { Products } from './pages/products/products';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../app/pages/home/home').then(mod => mod.Home) },
  { path: 'products', loadComponent: () => import('../app/pages/products/products').then(mod => mod.Products) },
  { path: 'cart', loadComponent: () => import('../app/pages/cart/cart').then(mod => mod.CartComponent) },
];
