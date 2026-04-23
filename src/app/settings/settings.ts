import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings implements OnInit {

  user: any = null;

  // Dark mode
  @HostBinding('class.dark-mode') darkMode = false;

  // Password fields
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordMessage = '';

  // Profile image
  profilePreview: string | ArrayBuffer | null = null;

  showEdit = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }

      const mode = localStorage.getItem('darkMode');
      this.darkMode = mode === 'true';

      // ✅ ADDED: apply body class on load
      this.applyTheme();

      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) {
        this.profilePreview = savedImage;
      }
    }
  }

  // Toggle edit
  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  saveProfile() {
    alert('Profile updated!');
    this.showEdit = false;
  }

  // Toggle dark mode
  switchMode() {
    this.darkMode = !this.darkMode;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', this.darkMode.toString());
    }

    // ✅ ADDED: apply instantly
    this.applyTheme();
  }

  // ✅ ADDED: global theme handler
  applyTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Logout
  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  // Switch account
  switchAccount() {
    this.logout();
  }

  // Change password
  changePassword() {
    this.passwordMessage = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordMessage = 'All fields are required!';
      return;
    }

    if (!this.user || this.currentPassword !== this.user.password) {
      this.passwordMessage = 'Current password is incorrect!';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMessage = 'New passwords do not match!';
      return;
    }

    if (typeof localStorage !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.username === this.user.username);

      if (index >= 0) {
        users[index].password = this.newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        this.user.password = this.newPassword;
        localStorage.setItem('currentUser', JSON.stringify(this.user));

        this.passwordMessage = 'Password changed successfully!';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }
    }
  }

  // Profile image upload
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.profilePreview = reader.result;

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('profileImage', reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  addProfile() {
    alert('Edit profile clicked!');
  }
}