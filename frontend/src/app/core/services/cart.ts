import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount = signal<number>(0);

  constructor() {
    // Initialize cart count from localStorage or API
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      this.cartCount.set(parseInt(savedCount, 10));
    }
  }

  addToCart() {
    this.cartCount.update((count) => count + 1);
    this.saveCartCount();
  }

  removeFromCart() {
    this.cartCount.update((count) => Math.max(0, count - 1));
    this.saveCartCount();
  }

  clearCart() {
    this.cartCount.set(0);
    this.saveCartCount();
  }

  private saveCartCount() {
    localStorage.setItem('cartCount', this.cartCount().toString());
  }
}
