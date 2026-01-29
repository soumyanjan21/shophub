import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="summary-card">
      <h2>Order Summary</h2>

      <div class="summary-row">
        <span>Subtotal</span>
        <span>\${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>$9.99</span>
      </div>
      <div class="summary-row">
        <span>Tax</span>
        <span>\${{ tax.toFixed(2) }}</span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-row total">
        <span>Total</span>
        <span>\${{ total.toFixed(2) }}</span>
      </div>

      <button class="btn-primary" style="width: 100%; margin-top: 20px;" (click)="checkout.emit()">
        Proceed to Checkout
      </button>
      <a
        routerLink="/products"
        class="btn-secondary"
        style="width: 100%; text-align: center; margin-top: 10px; display: block;"
      >
        Continue Shopping
      </a>

      <div class="promo-section">
        <input type="text" placeholder="Enter promo code" class="promo-input" />
        <button class="btn-secondary">Apply</button>
      </div>
    </div>
  `,
  styles: [
    `
      .summary-card {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        padding: 1.5rem;
        position: sticky;
        top: 100px;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        color: var(--neutral-300);
      }
      .summary-row.total {
        font-weight: 700;
        color: var(--white);
        font-size: 1.2rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--neutral-700);
      }
      .summary-divider {
        height: 1px;
        background-color: var(--neutral-700);
        margin: 1rem 0;
      }
      .promo-section {
        display: flex;
        gap: 0.5rem;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--neutral-700);
      }
      .promo-input {
        flex: 1;
        padding: 0.5rem;
        background-color: var(--neutral-900);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        color: var(--white);
      }
    `,
  ],
})
export class CartSummaryComponent {
  @Input({ required: true }) subtotal!: number;
  @Input({ required: true }) tax!: number;
  @Input({ required: true }) total!: number;
  @Output() checkout = new EventEmitter<void>();
}
