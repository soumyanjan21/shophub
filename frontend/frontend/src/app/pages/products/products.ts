import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        const processed = data.map((p) => ({
          ...p,
          emoji: p.emoji || '📦',
          category: p.category || 'General',
          description: p.description || 'No description available.',
        }));
        this.products.set(processed);
      },
      error: (err) => console.error('Failed to load products', err),
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product._id).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: () => alert('Failed to add to cart (Are you logged in?)'),
    });
  }
}
