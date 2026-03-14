import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { CommonModule } from '@angular/common';  // <-- import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule], // <-- add CommonModule here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  get isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('currentUser');
  }
}