import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AuthFormService } from '../../services/auth-form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  template: `
    <div class="modal" id="signupModal">
      <div class="modal-content">
        <button class="modal-close" (click)="closeModal()">&times;</button>
        <div class="auth-container">
          <form (ngSubmit)="onSignup()" class="auth-form">
            <h2>Create Account</h2>

            <app-input
              [control]="signupControls.name"
              [label]="'Full Name'"
              [type]="'text'"
              [id]="'signupName'"
              [placeholder]="'Enter your full name'"
            />

            <app-input
              [control]="signupControls.email"
              [label]="'Email'"
              [type]="'email'"
              [id]="'signupEmail'"
              [placeholder]="'Enter your email'"
            />

            <app-input
              [control]="signupControls.password"
              [label]="'Password'"
              [type]="'password'"
              [id]="'signupPassword'"
              [placeholder]="'Create a password'"
            />

            <app-button
              [type]="'submit'"
              [variant]="'primary'"
              [size]="'medium'"
              [disabled]="!formService.isSignupFormValid()"
              [loading]="formService.isSigningUp()"
            >
              Sign Up
            </app-button>
          </form>
        </div>
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
        transition: color 0.2s;
      }
      .modal-close:hover {
        color: var(--neutral-200);
      }
      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .auth-form h2 {
        margin-bottom: 0.5rem;
        text-align: center;
        color: var(--white);
      }
      app-button {
        width: 100%;
        margin-top: 0.5rem;
      }
      app-button button {
        width: 100%;
      }
    `,
  ],
})
export class SignupModal {
  private authService = inject(AuthService);
  formService = inject(AuthFormService);

  signupControls = this.formService.getSignupControls();

  closeModal(): void {
    const modal = document.getElementById('signupModal');
    if (modal) modal.classList.remove('active');
    this.formService.resetSignupForm();
  }

  onSignup(): void {
    if (!this.formService.isSignupFormValid()) {
      this.formService.markSignupFormAsTouched();
      return;
    }

    this.formService.isSigningUp.set(true);
    const signupData = this.formService.getSignupFormData();

    this.authService.register(signupData).subscribe({
      next: () => {
        alert('Signup successful! Please login.');
        this.closeModal();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.add('active');
        this.formService.isSigningUp.set(false);
      },
      error: (err) => {
        alert('Signup failed: ' + err.message);
        this.formService.isSigningUp.set(false);
      },
    });
  }
}
