import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthModal } from './components/auth-modal/auth-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, AuthModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'frontend';
}
