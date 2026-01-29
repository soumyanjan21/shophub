import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <div class="container nav-content">
        <a href="/" class="logo"> 🛍️ <span>ShopHub</span> </a>
        <div class="nav-links">
          <a
            routerLink="/"
            class="nav-link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
          <a routerLink="/products" class="nav-link" routerLinkActive="active">Products</a>
          <div
            class="nav-link"
            style="cursor: pointer;"
            routerLink="/cart"
            routerLinkActive="active"
          >
            <span>Cart</span>
            <span class="cart-count">{{ cartCount() }}</span>
          </div>
        </div>
        <div class="nav-actions">
          @if (!isAuthenticated()) {
            <button class="btn-secondary" (click)="openLoginModal()">Login</button>
            <button class="btn-primary" (click)="openSignupModal()">Sign Up</button>
          }
          @if (isAuthenticated()) {
            <button class="btn-secondary" (click)="logout()">Logout</button>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      nav {
        background-color: rgba(31, 41, 55, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--neutral-700);
        position: sticky;
        top: 0;
        z-index: 100;
        padding: 1rem 0;
      }
      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--white);
        text-decoration: none;
      }
      .logo span {
        color: var(--primary);
      }
      .nav-links {
        display: flex;
        gap: 2rem;
        align-items: center;
      }
      .nav-link {
        color: var(--neutral-400);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .nav-link:hover,
      .nav-link.active {
        color: var(--primary);
      }
      .cart-count {
        background-color: var(--primary);
        color: var(--white);
        font-size: 0.75rem;
        padding: 0.1rem 0.4rem;
        border-radius: 999px;
        font-weight: 700;
      }
      .nav-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
    `,
  ],
})
export class Navbar {
  authService = inject(AuthService);
  cartService = inject(CartService);

  isAuthenticated = this.authService.isAuthenticated;
  cartCount = this.cartService.cartCount;

  openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');
  }

  openSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) modal.classList.add('active');
  }

  logout() {
    this.authService.logout();
  }
}
