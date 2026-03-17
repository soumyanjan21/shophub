import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { LoginModal } from './core/components/login-modal/login-modal';
import { SignupModal } from './core/components/signup-modal/signup-modal';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'shop-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, LoginModal, SignupModal, Footer],
  template: `
    <shop-navbar></shop-navbar>
    <shop-login-modal></shop-login-modal>
    <shop-signup-modal></shop-signup-modal>
    <div style="min-height: 60vh;">
      <router-outlet></router-outlet>
    </div>
    <shop-footer></shop-footer>
  `,
})
export class App {}
