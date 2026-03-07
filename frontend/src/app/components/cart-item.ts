import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../services/cart';
import { CART_CONFIG } from '../config/cart.config';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="cart-item">
      <img
        [src]="item.product.image || placeholderImage"
        class="cart-item-image"
        [alt]="item.product.name"
      />
      <div class="cart-item-details">
        <h3>{{ item.product.name }}</h3>
        <p>{{ item.product.description }}</p>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button
              (click)="onQuantityChange(-1)"
              [disabled]="isMinQuantity"
              [attr.aria-label]="'Decrease quantity of ' + item.product.name"
              [class.disabled]="isMinQuantity"
            >
              -
            </button>
            <span class="quantity-display" aria-live="polite">{{ item.quantity }}</span>
            <button
              (click)="onQuantityChange(1)"
              [disabled]="isMaxQuantity"
              [attr.aria-label]="'Increase quantity of ' + item.product.name"
              [class.disabled]="isMaxQuantity"
            >
              +
            </button>
          </div>
          <button
            class="remove-item"
            (click)="onRemove()"
            [attr.aria-label]="'Remove ' + item.product.name + ' from cart'"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="cart-item-price">\${{ itemTotal.toFixed(2) }}</div>
    </div>
  `,
  styles: [
    `
      .cart-item {
        display: grid;
        grid-template-columns: 100px 1fr auto;
        gap: 1rem;
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        padding: 1rem;
        align-items: center;
      }
      .cart-item-image {
        width: 100px;
        height: 100px;
        background-color: var(--neutral-700);
        border-radius: var(--radius);
        object-fit: cover;
      }
      .cart-item-details h3 {
        color: var(--white);
        margin-bottom: 0.5rem;
      }
      .cart-item-details p {
        color: var(--neutral-400);
        font-size: 0.9rem;
      }
      .cart-item-controls {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
        align-items: center;
      }
      .quantity-control {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        background-color: var(--neutral-700);
        border-radius: var(--radius);
        padding: 0.25rem;
      }
      .quantity-control button {
        width: 24px;
        height: 24px;
        background: none;
        border: none;
        color: var(--white);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
      }
      .quantity-control button:hover:not(.disabled) {
        color: var(--primary);
      }
      .quantity-control button.disabled {
        color: var(--neutral-600);
        cursor: not-allowed;
        opacity: 0.5;
      }
      .quantity-display {
        min-width: 20px;
        text-align: center;
        color: var(--white);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .remove-item {
        background: none;
        border: none;
        color: var(--accent-red);
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0;
        transition: opacity 0.2s ease;
      }
      .remove-item:hover {
        text-decoration: underline;
        opacity: 0.8;
      }
      .cart-item-price {
        color: var(--white);
        font-weight: 700;
        font-size: 1.1rem;
      }
      @media (max-width: 768px) {
        .cart-item {
          grid-template-columns: 80px 1fr;
          position: relative;
        }
        .cart-item-price {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
      }
    `,
  ],
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  protected readonly placeholderImage = CART_CONFIG.PLACEHOLDER_IMAGE;

  /**
   * Check if item is at minimum quantity
   */
  get isMinQuantity(): boolean {
    return this.item.quantity <= CART_CONFIG.MIN_QUANTITY;
  }

  /**
   * Check if item is at maximum quantity
   */
  get isMaxQuantity(): boolean {
    return this.item.quantity >= CART_CONFIG.MAX_QUANTITY;
  }

  /**
   * Calculate total price for this item
   */
  get itemTotal(): number {
    return this.item.product.price * this.item.quantity;
  }

  /**
   * Handle quantity change with validation
   */
  onQuantityChange(delta: number): void {
    const newQuantity = this.item.quantity + delta;

    // Validate quantity bounds
    if (newQuantity < CART_CONFIG.MIN_QUANTITY || newQuantity > CART_CONFIG.MAX_QUANTITY) {
      return;
    }

    this.quantityChange.emit(delta);
  }

  /**
   * Handle item removal
   */
  onRemove(): void {
    this.remove.emit();
  }
}
