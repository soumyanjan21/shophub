import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CartItemComponent } from '../../components/cart-item';
import { CartSummaryComponent } from '../../components/cart-summary';
import { CheckoutModalComponent } from '../../components/checkout-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    CartSummaryComponent,
    CheckoutModalComponent,
    RouterLink,
  ],
  template: `
    <section class="cart-section container">
      @if (cart() && cart()!.items.length > 0) {
        <h1>Your Cart</h1>
        <div class="cart-grid">
          <div class="cart-items">
            @for (item of cart()!.items; track item.product._id) {
              <app-cart-item
                [item]="item"
                (quantityChange)="updateQuantity(item.product._id, $event)"
                (remove)="removeItem(item.product._id)"
              >
              </app-cart-item>
            }
          </div>

          <app-cart-summary
            [subtotal]="calculateSubtotal()"
            [tax]="calculateTax()"
            [total]="calculateTotal()"
            (checkout)="openCheckout()"
          >
          </app-cart-summary>
        </div>
      } @else {
        <div class="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Browse our products and add items to your cart</p>
          <a routerLink="/products" class="btn-primary" style="margin-top: 1rem;">Start Shopping</a>
        </div>
      }
    </section>

    <app-checkout-modal [isOpen]="isCheckoutOpen()" (close)="closeCheckout()"></app-checkout-modal>
  `,
  styles: [
    `
      .cart-section {
        padding: 2rem 0;
      }
      .cart-grid {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 2rem;
        align-items: start;
      }
      .cart-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--neutral-400);
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
      }
      .empty-state svg {
        margin-bottom: 1rem;
        color: var(--neutral-600);
      }
      .empty-state h3 {
        color: var(--white);
        margin-bottom: 0.5rem;
      }
      @media (max-width: 768px) {
        .cart-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;
  isCheckoutOpen = signal(false);

  calculateSubtotal(): number {
    return (
      this.cart()?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0
    );
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax() + 9.99;
  }

  removeItem(productId: string) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(productId).subscribe();
    }
  }

  updateQuantity(productId: string, change: number) {
    if (change > 0) {
      this.cartService.addToCart(productId, 1).subscribe();
    } else {
      console.warn('Decrement not fully supported by current backend API');
    }
  }

  openCheckout() {
    this.isCheckoutOpen.set(true);
  }

  closeCheckout() {
    this.isCheckoutOpen.set(false);
  }
}
