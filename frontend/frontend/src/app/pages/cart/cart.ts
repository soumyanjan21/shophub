import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;

  calculateSubtotal(): number {
    return (
      this.cart()?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0
    );
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1; // Mock 10% tax
  }

  calculateTotal(): number {
    // Subtotal + Tax + Shipping (Mock $9.99)
    return this.calculateSubtotal() + this.calculateTax() + 9.99;
  }

  removeItem(productId: string) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(productId).subscribe();
    }
  }

  updateQuantity(productId: string, change: number) {
    // Logic for updating quantity would ideally use a dedicated endpoint or reuse add/remove logic
    // Since backend only has "addToCart" (increment) and "removeItem" (remove),
    // strict quantity set might need backend update.
    // For now, assume add = increment. Decrement is harder without a specific endpoint.
    // I'll skip decrement logic details for now or just impl increment.
    if (change > 0) {
      this.cartService.addToCart(productId, 1).subscribe();
    } else {
      // Handle decrement logic if backend supports it or call removeItem if qty 1
      console.warn('Decrement not fully supported by current backend API');
    }
  }

  openCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('active');
  }

  closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
  }
}
