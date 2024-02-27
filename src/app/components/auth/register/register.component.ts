import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [Validators.required, Validators.minLength(4), Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      if (username && email && password) {
        this.authService
          .register(username.toLowerCase(), email.toLowerCase(), password)
          .subscribe({
            next: () => {
              this.router.navigate(['/log-in']);
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
}
