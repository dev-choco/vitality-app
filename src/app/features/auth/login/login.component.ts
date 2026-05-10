import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private config = inject(ConfigService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loading = false;
  error = '';
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private timeoutTimer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit() {
    this.waitForGoogleApi();
  }

  ngOnDestroy() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    if (this.timeoutTimer) clearTimeout(this.timeoutTimer);
  }

  private waitForGoogleApi() {
    let attempts = 0;
    this.pollTimer = setInterval(() => {
      attempts++;
      if (typeof google !== 'undefined' && google?.accounts?.id) {
        clearInterval(this.pollTimer!);
        if (this.timeoutTimer) clearTimeout(this.timeoutTimer);
        this.initGoogleSignIn();
      }
    }, 300);

    this.timeoutTimer = setTimeout(() => {
      if (this.pollTimer) clearInterval(this.pollTimer);
    }, 15000);
  }

  private initGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.config.googleClientId,
      callback: (response: any) => {
        const idToken = response.credential;
        this.loading = true;
        this.error = '';

        this.auth.googleLogin(idToken).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => {
            this.loading = false;
            this.error = err.error?.message || 'Error al iniciar con Google';
          },
        });
      },
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: 280,
        text: 'signin_with',
        shape: 'rectangular',
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    this.auth.login({
      email: this.form.value.email!,
      password: this.form.value.password!,
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Credenciales inválidas';
      },
    });
  }
}
