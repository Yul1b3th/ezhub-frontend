import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';

import { DsTextInputComponent } from '@design-system/components/ds-input/ds-text-input/ds-text-input.component';
import { DsNumberInputComponent } from '@design-system/components/ds-input/ds-number-input/ds-number-input.component';
import { DsEmailInputComponent } from '@design-system/components/ds-input/ds-email-input/ds-email-input.component';
import { DsPasswordInputComponent } from '@design-system/components/ds-input/ds-password-input/ds-password-input.component';
import { DsDateInputComponent } from '@design-system/components/ds-input/ds-date-input/ds-date-input.component';
import { DsSelectInputComponent } from '@design-system/components/ds-input/ds-select-input/ds-select-input.component';
import { DsCheckboxComponent } from '@design-system/components/ds-input/ds-checkbox/ds-checkbox.component';
import { DsRadioComponent } from '@design-system/components/ds-input/ds-radio/ds-radio.component';
import { DsTextareaComponent } from '@design-system/components/ds-input/ds-textarea/ds-textarea.component';
import { DsSwitchComponent } from '@design-system/components/ds-input/ds-switch/ds-switch.component';
import { ThemeService } from '@design-system/services/theme.service';
import { filter } from 'rxjs';

@Component({
  selector: 'page-input',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    DsTextInputComponent,
    DsNumberInputComponent,
    DsEmailInputComponent,
    DsPasswordInputComponent,
    DsDateInputComponent,
    DsSelectInputComponent,
    DsCheckboxComponent,
    DsRadioComponent,
    DsTextareaComponent,
    DsSwitchComponent,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputComponent implements OnInit, AfterViewInit {
  public readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private activeSection: HTMLElement | null = null;
  public activeFragment: string = '';
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  textIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
`;

  quantityIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
`;

  emailIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
`;

  dateIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
`;

  ngOnInit(): void {
    this.form = this.fb.group({
      textInput: [''],
      quantity: [null],
      emailInput: [''],
      passwordInput: [''],
      dateInput: [''],
      selectInput: [null],
      checkboxInput: [false],
      radioInput: [''],
      textareaInput: [''],
      switchInput: [false],
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlFragment = this.router.parseUrl(this.router.url).fragment;
        this.activeFragment = urlFragment || '';
      }
    });
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scrollToSection(fragment);
        }
      });
  }

  private scrollToSection(fragment: string) {
    const section = this.sections.find(
      (sec) => sec.nativeElement.id === fragment,
    );
    if (section) {
      this.activeSection = section.nativeElement;
      setTimeout(() => {
        if (this.activeSection) {
          this.activeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          setTimeout(() => {
            if (this.activeSection) {
              const yOffset = -40;
              const y =
                this.activeSection.getBoundingClientRect().top +
                window.scrollY +
                yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 300);
        }
      }, 0);
    }
  }

  isActive(fragment: string): boolean {
    return this.activeFragment === fragment;
  }
}
