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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;
      this.authService.login(usernameOrEmail, password).subscribe({
        next: () => {
          //this.router.navigateByUrl('/');

          const redirectUrl = localStorage.getItem('url');
          this.router.navigateByUrl(redirectUrl ?? '/');
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
