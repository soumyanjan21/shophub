import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IFormStateManager {
  isValid(): boolean;
  reset(): void;
  markAllAsTouched(): void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  isLoggingIn = signal<boolean>(false);
  isSigningUp = signal<boolean>(false);

  private loginEmailControl = new FormControl('', [Validators.required, Validators.email]);
  private loginPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  private signupNameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  private signupEmailControl = new FormControl('', [Validators.required, Validators.email]);
  private signupPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  loginForm = new FormGroup({
    email: this.loginEmailControl,
    password: this.loginPasswordControl,
  });

  signupForm = new FormGroup({
    name: this.signupNameControl,
    email: this.signupEmailControl,
    password: this.signupPasswordControl,
  });

  getLoginControls() {
    return {
      email: this.loginEmailControl,
      password: this.loginPasswordControl,
    };
  }

  getSignupControls() {
    return {
      name: this.signupNameControl,
      email: this.signupEmailControl,
      password: this.signupPasswordControl,
    };
  }

  isLoginFormValid(): boolean {
    return this.loginForm.valid;
  }

  isSignupFormValid(): boolean {
    return this.signupForm.valid;
  }

  getLoginFormData(): LoginFormData {
    return {
      email: this.loginEmailControl.value || '',
      password: this.loginPasswordControl.value || '',
    };
  }

  getSignupFormData(): SignupFormData {
    return {
      name: this.signupNameControl.value || '',
      email: this.signupEmailControl.value || '',
      password: this.signupPasswordControl.value || '',
    };
  }

  markLoginFormAsTouched(): void {
    this.loginForm.markAllAsTouched();
  }

  markSignupFormAsTouched(): void {
    this.signupForm.markAllAsTouched();
  }

  resetAllForms(): void {
    this.loginForm.reset();
    this.signupForm.reset();
    this.isLoggingIn.set(false);
    this.isSigningUp.set(false);
  }

  resetLoginForm(): void {
    this.loginForm.reset();
    this.isLoggingIn.set(false);
  }

  resetSignupForm(): void {
    this.signupForm.reset();
    this.isSigningUp.set(false);
  }
}
