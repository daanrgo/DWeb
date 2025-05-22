import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    const id = this.authService.getUserId();

    if (role && id) {
      const redirectPath = this.authService.redirectByRole(role, id);
      this.router.navigate([redirectPath]);
    }
  }
}
