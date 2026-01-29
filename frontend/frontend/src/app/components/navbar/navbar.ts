import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngClass etc (if needed) //
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService = inject(AuthService);
  cartService = inject(CartService);

  isAuthenticated = this.authService.isAuthenticated;
  cartCount = this.cartService.cartCount;

  openAuthModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.classList.add('active');
  }

  logout() {
    this.authService.logout();
  }
}
