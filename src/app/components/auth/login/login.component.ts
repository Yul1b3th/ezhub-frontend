import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CustomLabelDirective } from '../../../directives/custom-label.directive';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  });

  public formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;
      console.log(this.authService.authStatus());

      this.authService.login(usernameOrEmail, password).subscribe({
        next: () => {
          console.log(this.authService.authStatus());
          if (this.authService.authStatus() === AuthStatus.authenticated) {
            const redirectUrl = localStorage.getItem('state-url');
            console.log({ redirectUrl });

            if (redirectUrl) {
              console.log('yuli');

              this.router.navigateByUrl(redirectUrl);
              localStorage.removeItem('state-url');
              return;
            }
          }

          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err);

          if (err === 'Username or email is wrong') {
            this.loginForm
              .get('usernameOrEmail')
              ?.setErrors({ usernameOrEmailWrong: true });
          } else if (err === 'Password is wrong') {
            this.loginForm.get('password')?.setErrors({ passwordWrong: true });
          } else {
            console.error(err);
          }
        },
      });
    }
  }

  cleanUsername(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Limpia los espacios en blanco
    inputElement.value = inputElement.value.replace(/\s/g, '');
    this.loginForm.get('usernameOrEmail')?.setValue(inputElement.value);
  }

  cleanPassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/\s/g, '');
    this.loginForm.get('password')?.setValue(inputElement.value);
  }
}
