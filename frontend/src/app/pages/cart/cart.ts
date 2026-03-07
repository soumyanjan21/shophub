import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CartItemComponent } from '../../components/cart-item';
import { CartSummaryComponent } from '../../components/cart-summary';
import { CheckoutModalComponent } from '../../components/checkout-modal';
import { RouterLink } from '@angular/router';
import { EmptyCartIcon } from '../../shared/components/icons/empty-cart-icon.component';
import { CART_CONFIG, CART_MESSAGES } from '../../config/cart.config';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    CartSummaryComponent,
    CheckoutModalComponent,
    RouterLink,
    EmptyCartIcon,
  ],
  template: `
    <section class="cart-section container">
      @if (cartService.error()) {
        <div class="error-banner">
          <span>{{ cartService.error() }}</span>
          <button (click)="cartService.clearError()" aria-label="Dismiss error">×</button>
        </div>
      }

      @if (cart() && cart()!.items.length > 0) {
        <h1>Your Cart</h1>
        <div class="cart-grid">
          <div class="cart-items">
            @for (item of cart()!.items; track item.product._id) {
              <app-cart-item
                [item]="item"
                (quantityChange)="updateQuantity(item.product._id, $event)"
                (remove)="confirmRemoveItem(item.product._id, item.product.name)"
              >
              </app-cart-item>
            }
          </div>

          <app-cart-summary
            [subtotal]="subtotal()"
            [tax]="tax()"
            [total]="total()"
            (checkout)="openCheckout()"
          >
          </app-cart-summary>
        </div>
      } @else if (!cartService.isLoading()) {
        <div class="empty-state">
          <app-empty-cart-icon size="64"></app-empty-cart-icon>
          <h3>Your cart is empty</h3>
          <p>Browse our products and add items to your cart</p>
          <a routerLink="/products" class="btn-primary">Start Shopping</a>
        </div>
      }

      @if (cartService.isLoading()) {
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      }
    </section>

    <app-checkout-modal [isOpen]="isCheckoutOpen()" (close)="closeCheckout()"></app-checkout-modal>

    @if (confirmationDialog()) {
      <div class="confirmation-overlay" (click)="cancelRemove()">
        <div class="confirmation-dialog" (click)="$event.stopPropagation()">
          <h3>Remove Item</h3>
          <p>{{ confirmationDialog()!.message }}</p>
          <div class="confirmation-actions">
            <button class="btn-secondary" (click)="cancelRemove()">Cancel</button>
            <button class="btn-danger" (click)="executeRemove()">Remove</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .cart-section {
        padding: 2rem 0;
        position: relative;
      }
      .error-banner {
        background-color: var(--accent-red);
        color: var(--white);
        padding: 1rem;
        border-radius: var(--radius);
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .error-banner button {
        background: none;
        border: none;
        color: var(--white);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
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
      .empty-state .btn-primary {
        margin-top: 1rem;
        display: inline-block;
      }
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--neutral-700);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .confirmation-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .confirmation-dialog {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        padding: 2rem;
        max-width: 400px;
        width: 90%;
      }
      .confirmation-dialog h3 {
        color: var(--white);
        margin-bottom: 1rem;
      }
      .confirmation-dialog p {
        color: var(--neutral-400);
        margin-bottom: 1.5rem;
      }
      .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }
      .btn-secondary {
        background-color: var(--neutral-700);
        color: var(--white);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .btn-secondary:hover {
        background-color: var(--neutral-600);
      }
      .btn-danger {
        background-color: var(--accent-red);
        color: var(--white);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
        cursor: pointer;
        transition: opacity 0.2s ease;
      }
      .btn-danger:hover {
        opacity: 0.9;
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
  confirmationDialog = signal<{ productId: string; message: string } | null>(null);

  /**
   * Computed signal for cart subtotal
   * Automatically recalculates when cart changes
   */
  subtotal = computed(() => {
    return (
      this.cart()?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0
    );
  });

  /**
   * Computed signal for tax amount
   */
  tax = computed(() => {
    return this.subtotal() * CART_CONFIG.TAX_RATE;
  });

  /**
   * Computed signal for total amount (subtotal + tax + shipping)
   */
  total = computed(() => {
    return this.subtotal() + this.tax() + CART_CONFIG.SHIPPING_COST;
  });

  /**
   * Show confirmation dialog before removing item
   */
  confirmRemoveItem(productId: string, productName: string): void {
    this.confirmationDialog.set({
      productId,
      message: `${CART_MESSAGES.REMOVE_CONFIRMATION}\n\n"${productName}"`,
    });
  }

  /**
   * Execute item removal after confirmation
   */
  executeRemove(): void {
    const dialog = this.confirmationDialog();
    if (dialog) {
      this.cartService.removeItem(dialog.productId).subscribe({
        error: () => {
          // Error is already handled by the service
          this.confirmationDialog.set(null);
        },
        complete: () => {
          this.confirmationDialog.set(null);
        },
      });
    }
  }

  /**
   * Cancel item removal
   */
  cancelRemove(): void {
    this.confirmationDialog.set(null);
  }

  /**
   * Update item quantity
   * Handles both increment and decrement
   */
  updateQuantity(productId: string, delta: number): void {
    const currentItem = this.cart()?.items.find((item) => item.product._id === productId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + delta;

    if (newQuantity <= 0) {
      this.confirmRemoveItem(productId, currentItem.product.name);
      return;
    }

    // Use the new updateQuantity method from the service
    this.cartService.updateQuantity(productId, newQuantity).subscribe({
      error: () => {
        // Error is already handled by the service
      },
    });
  }

  /**
   * Open checkout modal
   */
  openCheckout(): void {
    this.isCheckoutOpen.set(true);
  }

  /**
   * Close checkout modal
   */
  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
  }
}
