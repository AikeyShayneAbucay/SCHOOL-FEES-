import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {

  constructor(private router: Router) {}

  showLoginSection = true;

  // LOGIN
  loginUsername = '';
  loginPassword = '';
  loginError = '';

  // REGISTER
  regFirstName = '';
  regLastName = '';
  regEmail = '';
  regContact = '';
  regAddress = '';
  regBirthDate = '';
  regAge: number | null = null;
  regGender = '';
  regUsername = '';
  regPassword = '';
  regRole = 'admin';

  registerMessage = '';

  // Toggle sections
  showRegister() {
    this.showLoginSection = false;
    this.loginError = '';
  }

  showLogin() {
    this.showLoginSection = true;
    this.registerMessage = '';
  }

  // Compute age
  computeAge() {
    if (!this.regBirthDate) return;
    const today = new Date();
    const dob = new Date(this.regBirthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
    this.regAge = age;
  }

  // Register
  register() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!this.regUsername || !this.regPassword) {
      this.registerMessage = 'Username and password are required!';
      return;
    }

    // Password validation: min 6 chars, 1 uppercase, 1 number
    const pattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!pattern.test(this.regPassword)) {
      this.registerMessage =
        'Password must be at least 6 characters, include 1 uppercase letter and 1 number!';
      return;
    }

    if (users.find((u: any) => u.username === this.regUsername)) {
      this.registerMessage = 'Username already exists!';
      return;
    }

    users.push({
      first_name: this.regFirstName,
      last_name: this.regLastName,
      email: this.regEmail,
      contact: this.regContact,
      address: this.regAddress,
      dob: this.regBirthDate,
      age: this.regAge,
      gender: this.regGender,
      username: this.regUsername,
      password: this.regPassword,
      role: this.regRole,
      status: 'active',
    });

    localStorage.setItem('users', JSON.stringify(users));
    this.registerMessage = 'Registration successful!';
    
  }

  // Login
  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.username === this.loginUsername && u.password === this.loginPassword
    );

    if (!user) {
      this.loginError = 'Invalid username or password!';
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }
}