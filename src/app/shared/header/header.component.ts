// src/app/shared/header/header.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: number | null = null;

  constructor(public router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = currentUser?.id || null;
  }

  irACarta(): void {
    if (this.userId) {
      this.router.navigate([`/comidas/${this.userId}/tarjetas`]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  irACarrito(): void {
    if (this.userId) {
      this.router.navigate([`/comidas/${this.userId}/carrito`]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  scrollTo(anchorId: string): void {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
