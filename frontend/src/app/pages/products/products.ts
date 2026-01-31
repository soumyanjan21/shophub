import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';
import { ProductCardComponent } from '../../components/product-card';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ScrollingModule],
  template: `
    <section class="products-section" id="products">
      <div class="container">
        <h2>Featured Products</h2>
        <div class="filters">
          <input type="text" placeholder="Search products..." class="search-input" />
          <select class="category-filter">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Garden</option>
            <option value="sports">Sports & Outdoors</option>
          </select>
        </div>

        <cdk-virtual-scroll-viewport [itemSize]="350" class="products-viewport">
          <div class="products-grid">
            @for (product of products(); track product._id) {
              <app-product-card
                [product]="product"
                (addToCart)="addToCart($event)"
              ></app-product-card>
            }
          </div>
        </cdk-virtual-scroll-viewport>
      </div>
    </section>
  `,
  styles: [
    `
      .products-section {
        padding-bottom: 4rem;
      }
      .products-section h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
      .filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
      }
      .search-input {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        color: var(--white);
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        min-width: 300px;
        font-size: 1rem;
      }
      .category-filter {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        color: var(--white);
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        cursor: pointer;
        font-size: 1rem;
      }
      .products-viewport {
        height: 800px;
        width: 100%;
      }
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
        padding: 0 1rem;
      }

      :host ::ng-deep .cdk-virtual-scroll-content-wrapper {
        width: 100%;
      }
    `,
  ],
})
export class Products {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  addToCart(product: Product) {
    this.cartService.addToCart(product._id).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: () => alert('Failed to add to cart (Are you logged in?)'),
    });
  }
}
