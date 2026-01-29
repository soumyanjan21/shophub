import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string; // Item ID if needed (or use product ID)
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  cart = signal<Cart | null>(null);

  // Computed (manual for now, could be signal computed)
  cartCount = signal<number>(0);

  constructor() {
    this.getCart().subscribe();
  }

  getCart() {
    return this.http.get<Cart>('/api/cart').pipe(
      tap((cart) => {
        this.cart.set(cart);
        this.updateCount(cart);
      }),
    );
  }

  addToCart(productId: string, quantity: number = 1) {
    return this.http.post<Cart>('/api/cart', { productId, quantity }).pipe(
      tap((cart) => {
        this.cart.set(cart);
        this.updateCount(cart);
      }),
    );
  }

  removeItem(productId: string) {
    return this.http.delete<Cart>(`/api/cart/${productId}`).pipe(
      tap((cart) => {
        this.cart.set(cart);
        this.updateCount(cart);
      }),
    );
  }

  private updateCount(cart: Cart | null) {
    if (!cart) {
      this.cartCount.set(0);
      return;
    }
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.set(count);
  }
}
