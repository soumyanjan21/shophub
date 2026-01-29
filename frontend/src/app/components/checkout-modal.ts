import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" [class.active]="isOpen">
      <div class="modal-content checkout-modal">
        <button class="modal-close" (click)="close.emit()">&times;</button>
        <h2>Checkout</h2>

        <form>
          <div class="checkout-section">
            <h3>Shipping Address</h3>
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div class="form-group">
              <label>Street Address</label>
              <input type="text" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" required />
              </div>
              <div class="form-group">
                <label>State</label>
                <input type="text" required />
              </div>
            </div>
            <div class="form-group">
              <label>ZIP Code</label>
              <input type="text" required />
            </div>
          </div>

          <div class="checkout-section">
            <h3>Shipping Method</h3>
            <label class="radio-option">
              <input type="radio" name="shipping" value="standard" checked />
              <span>Standard Shipping (5-7 days) - $9.99</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="shipping" value="express" />
              <span>Express Shipping (2-3 days) - $19.99</span>
            </label>
          </div>

          <div class="checkout-section">
            <h3>Payment Information</h3>
            <div class="form-group">
              <label>Cardholder Name</label>
              <input type="text" required />
            </div>
            <div class="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </div>

          <button type="button" class="btn-primary" style="width: 100%;" (click)="close.emit()">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .modal.active {
        display: flex;
        opacity: 1;
      }
      .modal-content {
        background-color: var(--neutral-900);
        padding: 2.5rem;
        border-radius: var(--radius);
        width: 100%;
        max-width: 450px;
        border: 1px solid var(--neutral-700);
        position: relative;
        transform: translateY(20px);
        transition: transform 0.3s;
      }
      .modal.active .modal-content {
        transform: translateY(0);
      }
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--neutral-400);
        font-size: 1.5rem;
        cursor: pointer;
      }
      .checkout-modal {
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      }
      .checkout-section {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--neutral-700);
      }
      .checkout-section:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .checkout-section h3 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .radio-option {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        margin-bottom: 0.75rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .radio-option:hover {
        background-color: var(--neutral-700);
      }
      .radio-option input {
        accent-color: var(--primary);
      }
    `,
  ],
})
export class CheckoutModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
}
