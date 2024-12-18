import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CustomLabelDirective } from '../../../directives/custom-label.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public emailPattern: string =
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // RegisterComponent
  onSubmit() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      if (username && email && password) {
        this.authService
          .register(username.toLowerCase(), email.toLowerCase(), password)
          .subscribe({
            next: () => {
              this.authService
                .login(username.toLowerCase(), password)
                .subscribe({
                  next: () => {
                    this.router.navigate(['/list']);
                  },
                  error: (err) => {
                    console.error(err);
                  },
                });
            },
            error: (err) => {
              if (err.error.message === 'Username is already in use') {
                this.registerForm
                  .get('username')
                  ?.setErrors({ usernameExists: true });
              } else if (err.error.message === 'Email is already in use') {
                this.registerForm
                  .get('email')
                  ?.setErrors({ emailExists: true });
              } else {
                console.error(err);
              }
            },
          });
      }
    }
  }

  cleanUsername(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Limpia los espacios en blanco
    inputElement.value = inputElement.value.replace(/\s/g, '');
    this.registerForm.get('username')?.setValue(inputElement.value);
  }

  cleanEmail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value
      .trim()
      .replace(/[^a-zA-Z0-9.@_-]+/g, '');
    this.registerForm.get('email')?.setValue(inputElement.value);
  }

  cleanPassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/\s/g, '');
    this.registerForm.get('password')?.setValue(inputElement.value);
  }
}
