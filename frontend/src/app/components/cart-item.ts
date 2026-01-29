import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../services/cart';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="cart-item">
      <img
        [src]="item.product.image || 'https://placehold.co/100?text=No+Image'"
        class="cart-item-image"
        alt="{{ item.product.name }}"
      />
      <div class="cart-item-details">
        <h3>{{ item.product.name }}</h3>
        <p>{{ item.product.description }}</p>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button (click)="onQuantityChange(-1)">-</button>
            <span class="quantity-display">{{ item.quantity }}</span>
            <button (click)="onQuantityChange(1)">+</button>
          </div>
          <button class="remove-item" (click)="onRemove()">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">\${{ (item.product.price * item.quantity).toFixed(2) }}</div>
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
      }
      .quantity-control button:hover {
        color: var(--primary);
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
      }
      .remove-item:hover {
        text-decoration: underline;
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

  onQuantityChange(delta: number) {
    this.quantityChange.emit(delta);
  }

  onRemove() {
    this.remove.emit();
  }
}
