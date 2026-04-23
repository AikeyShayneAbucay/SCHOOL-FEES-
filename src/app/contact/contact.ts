import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  // Simulated admin/treasurer contact from current login
  currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  developers = [
    {
      name: 'Aikey Shayne Abucay',
      role: 'Developer',
      email: 'aikey@example.com',
      phone: '0917-111-1111',
      img: 'aikey.jpg'
    },
    {
      name: 'Eunice Marie Petagara',
      role: 'Developer',
      email: 'eunice@example.com',
      phone: '0917-222-2222',
      img: 'eunice.jpg'
    },
    {
      name: 'Geelan Aranzo',
      role: 'Developer',
      email: 'geelan@example.com',
      phone: '0917-333-3333',
      img: 'geelan.jpg'
    }
  ];
}