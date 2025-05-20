// src/app/pages/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res: any) => {
          this.authService.setCurrentUser(res);
          const redirect = this.authService.redirectByRole(res.role, res.id);
          this.router.navigate([redirect]);
        },
        error: () => {
          this.errorMessage = 'Correo o contraseña incorrectos. Intenta nuevamente.';
        }
      });
    }
  }

  loginWithGoogle() {
    alert('Funcionalidad de Google pendiente de implementar');
  }

  loginWithFacebook() {
    alert('Funcionalidad de Facebook pendiente de implementar');
  }
}
