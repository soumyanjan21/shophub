import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Interface for form state management
 * Follows Interface Segregation Principle - focused on form state only
 */
export interface IFormStateManager {
  isValid(): boolean;
  reset(): void;
  markAllAsTouched(): void;
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Signup form data structure
 */
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

/**
 * Service responsible for managing authentication form state and logic
 * Follows Single Responsibility Principle - only manages auth forms
 * Uses Composition to separate form logic from component presentation
 */
@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  // Signals for loading states
  isLoggingIn = signal<boolean>(false);
  isSigningUp = signal<boolean>(false);

  // Login form controls
  private loginEmailControl = new FormControl('', [Validators.required, Validators.email]);
  private loginPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  // Signup form controls
  private signupNameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  private signupEmailControl = new FormControl('', [Validators.required, Validators.email]);
  private signupPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  // Form groups for better organization
  loginForm = new FormGroup({
    email: this.loginEmailControl,
    password: this.loginPasswordControl,
  });

  signupForm = new FormGroup({
    name: this.signupNameControl,
    email: this.signupEmailControl,
    password: this.signupPasswordControl,
  });

  /**
   * Get login form controls for binding
   */
  getLoginControls() {
    return {
      email: this.loginEmailControl,
      password: this.loginPasswordControl,
    };
  }

  /**
   * Get signup form controls for binding
   */
  getSignupControls() {
    return {
      name: this.signupNameControl,
      email: this.signupEmailControl,
      password: this.signupPasswordControl,
    };
  }

  /**
   * Check if login form is valid
   */
  isLoginFormValid(): boolean {
    return this.loginForm.valid;
  }

  /**
   * Check if signup form is valid
   */
  isSignupFormValid(): boolean {
    return this.signupForm.valid;
  }

  /**
   * Get login form data
   */
  getLoginFormData(): LoginFormData {
    return {
      email: this.loginEmailControl.value || '',
      password: this.loginPasswordControl.value || '',
    };
  }

  /**
   * Get signup form data
   */
  getSignupFormData(): SignupFormData {
    return {
      name: this.signupNameControl.value || '',
      email: this.signupEmailControl.value || '',
      password: this.signupPasswordControl.value || '',
    };
  }

  /**
   * Mark all login form fields as touched to trigger validation
   */
  markLoginFormAsTouched(): void {
    this.loginForm.markAllAsTouched();
  }

  /**
   * Mark all signup form fields as touched to trigger validation
   */
  markSignupFormAsTouched(): void {
    this.signupForm.markAllAsTouched();
  }

  /**
   * Reset all forms and loading states
   * Follows Single Responsibility - manages all form cleanup in one place
   */
  resetAllForms(): void {
    this.loginForm.reset();
    this.signupForm.reset();
    this.isLoggingIn.set(false);
    this.isSigningUp.set(false);
  }

  /**
   * Reset only login form
   */
  resetLoginForm(): void {
    this.loginForm.reset();
    this.isLoggingIn.set(false);
  }

  /**
   * Reset only signup form
   */
  resetSignupForm(): void {
    this.signupForm.reset();
    this.isSigningUp.set(false);
  }
}
