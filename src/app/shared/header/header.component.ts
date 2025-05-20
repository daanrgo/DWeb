// src/app/shared/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: number | null = null;
  role: string | null = null;
  private userSub!: Subscription;

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.userId = user?.id || null;
      this.role = user?.role || null;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}