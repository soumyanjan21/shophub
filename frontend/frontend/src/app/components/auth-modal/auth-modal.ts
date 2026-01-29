import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss',
})
export class AuthModal {
  authService = inject(AuthService);

  activeTab = signal<'login' | 'signup'>('login');
  loginData = { email: '', password: '' };
  signupData = { name: '', email: '', password: '' };

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.classList.remove('active');
  }

  setTab(tab: 'login' | 'signup') {
    this.activeTab.set(tab);
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        alert('Login successful');
        this.closeModal();
      },
      error: (err) => alert('Login failed: ' + err.message),
    });
  }

  onSignup() {
    this.authService.register(this.signupData).subscribe({
      next: () => {
        alert('Signup successful (Please login)');
        this.setTab('login');
      },
      error: (err) => alert('Signup failed: ' + err.message),
    });
  }
}
