import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Product } from './product';
import { AuthService } from '../core/services/auth';

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
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
  // State signals
  cart = signal<Cart | null>(null);
  cartCount = signal<number>(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private authService = inject(AuthService);



  constructor() {
    if (this.authService.isAuthenticated()) {
      this.getCart().subscribe();
    }
  }

  /**
   * Fetch the current cart from the server
   */
  getCart(): Observable<Cart> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.get<Cart>('/api/cart').pipe(
      tap((cart) => this.handleCartUpdate(cart)),
      catchError((error) => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  /**
   * Add an item to the cart or update quantity
   */
  addToCart(productId: string, quantity: number = 1): Observable<Cart> {
    this.isLoading.set(true);
    this.error.set(null);
    
    return this.http.post<Cart>('/api/cart', { productId, quantity }).pipe(
      tap((cart) => this.handleCartUpdate(cart)),
      catchError((error) => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  /**
   * Update item quantity in the cart
   */
  updateQuantity(productId: string, quantity: number): Observable<Cart> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.put<Cart>(`/api/cart/${productId}`, { quantity }).pipe(
      tap((cart) => this.handleCartUpdate(cart)),
      catchError((error) => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  /**
   * Remove an item from the cart
   */
  removeItem(productId: string): Observable<Cart> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.delete<Cart>(`/api/cart/${productId}`).pipe(
      tap((cart) => this.handleCartUpdate(cart)),
      catchError((error) => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Centralized cart update handler (DRY principle)
   */
  private handleCartUpdate(cart: Cart): void {
    this.cart.set(cart);
    this.updateCount(cart);
  }

  /**
   * Centralized error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'An error occurred. Please try again.';
    this.error.set(errorMessage);
    alert(`Cart service error:${error.message}`) ;
    return throwError(() => error);
  }

  /**
   * Update cart item count
   */
  private updateCount(cart: Cart | null): void {
    if (!cart) {
      this.cartCount.set(0);
      return;
    }
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.set(count);
  }
}
