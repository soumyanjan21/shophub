import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { LoginModal } from './core/components/login-modal/login-modal';
import { SignupModal } from './core/components/signup-modal/signup-modal';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, LoginModal, SignupModal, Footer],
  template: `
    <app-navbar></app-navbar>
    <app-login-modal></app-login-modal>
    <app-signup-modal></app-signup-modal>
    <div style="min-height: 60vh;">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
})
export class App {}
