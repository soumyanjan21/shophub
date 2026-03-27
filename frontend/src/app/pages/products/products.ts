import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductFilters } from './product-filters/product-filters.component';
import { ProductList } from './product-list/product-list.component';
import { PRODUCT_CATEGORIES, DEFAULT_CATEGORY } from '../../constants';

@Component({
  selector: 'shop-products',
  standalone: true,
  imports: [CommonModule, ProductFilters, ProductList],
  providers: [ProductService],
  template: `
    <section class="products-section" id="products">
      <div class="container">
        <h2>Featured Products</h2>
        <shop-product-filters
          [categories]="categories"
          [selectedCategory]="category()"
          (categoryChange)="category.set($event)"
          (searchChange)="onSearch($event)"
        ></shop-product-filters>

        <shop-product-list
          [products]="filteredProducts()"
          (addToCart)="addToCart($event)"
        ></shop-product-list>
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
    `,
  ],
})
export class Products {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  readonly categories: string[] = [...PRODUCT_CATEGORIES];

  category = signal<string>(DEFAULT_CATEGORY);
  search = signal<string>('');

  products = toSignal(this.productService.getProducts(), { initialValue: [] as Product[] });

  filteredProducts = computed(() => {
    let result = this.products();

    if (this.category() !== DEFAULT_CATEGORY) {
      result = result.filter((product) => product.type === this.category());
    }

    const term = this.search().toLowerCase();
    if (term) {
      result = result.filter((product) => product.name.toLowerCase().includes(term));
    }

    return result;
  });

  addToCart(product: Product): void {
    this.cartService.addToCart(product._id).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: () => alert('Failed to add to cart (Are you logged in?)'),
    });
  }

  onSearch(searchTerm: string): void {
    this.search.set(searchTerm);
  }
}
