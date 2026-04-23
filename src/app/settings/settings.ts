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

toggleEdit() {
  this.showEdit = !this.showEdit;
}

saveProfile() {
  alert('Profile updated!');
  this.showEdit = false;
}

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    const mode = localStorage.getItem('darkMode');
    this.darkMode = mode === 'true';
  }

  ngOnInit(): void {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profilePreview = savedImage;
    }
  }

  // Toggle mode
  switchMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  // Logout
  logout() {
    localStorage.removeItem('currentUser');
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

    if (this.currentPassword !== this.user.password) {
      this.passwordMessage = 'Current password is incorrect!';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMessage = 'New passwords do not match!';
      return;
    }

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

  // Edit profile button
  addProfile() {
    alert('Edit profile clicked!');
  }

  // Upload image
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = reader.result;
      localStorage.setItem('profileImage', reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  
}