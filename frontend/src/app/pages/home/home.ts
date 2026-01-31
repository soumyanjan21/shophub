import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Discover Amazing Products</h1>
          <p>Shop the latest trends with fast shipping and secure checkout</p>
          <a href="#products" class="btn-primary">Shop Now</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 6rem 0;
        text-align: center;
        background:
          linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.9)),
          url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
        margin-bottom: 4rem;
      }
      .hero-content h1 {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
        background: linear-gradient(to right, #fff, #a7f3d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .hero-content p {
        font-size: 1.25rem;
        color: var(--neutral-300);
        max-width: 600px;
        margin: 0 auto 2.5rem;
      }
    `,
  ],
})
export class Home {}
