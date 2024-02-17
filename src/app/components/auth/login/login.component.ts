import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['user1', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;
      this.authService.login(usernameOrEmail, password).subscribe();
    }
  }
}
