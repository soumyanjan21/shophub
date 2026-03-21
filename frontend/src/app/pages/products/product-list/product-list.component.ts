import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from '../../../services/product';
import { ProductCardComponent } from '../../../components/product-card';

@Component({
  selector: 'shop-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport [itemSize]="350" class="products-viewport">
      <div class="products-grid">
        @for (product of products; track product._id) {
          <shop-product-card
            [product]="product"
            (addToCart)="addToCart.emit($event)"
          ></shop-product-card>
        }
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [
    `
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
    `
  ]
})
export class ProductList {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();
}
