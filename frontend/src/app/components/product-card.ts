import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <!-- <div class="product-image">{{ product.emoji }}</div> -->
      <img
        [src]="product.image || 'https://placehold.co/400?text=No+Image'"
        alt="{{ product.name }}"
        class="product-image"
        loading="lazy"
      />
      <div class="product-content">
        <div class="product-category">{{ product.category }}</div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-footer">
          <span class="product-price">\${{ product.price.toFixed(2) }}</span>
          <button class="btn-primary" (click)="addToCart.emit(product)">Add</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .product-card {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        border-radius: var(--radius);
        overflow: hidden;
        transition:
          transform 0.3s,
          box-shadow 0.3s;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow);
        border-color: var(--neutral-600);
      }
      .product-image {
        height: 200px;
        width: 100%;
        object-fit: cover;
        background-color: var(--neutral-700);
      }
      .product-content {
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .product-category {
        font-size: 0.85rem;
        color: var(--primary);
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .product-name {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: var(--white);
      }
      .product-description {
        color: var(--neutral-400);
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
      }
      .product-price {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--white);
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}
