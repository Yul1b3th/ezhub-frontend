import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterLink,
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { DsButtonComponent } from '@design-system/components/ds-button/ds-button.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'page-button',
  imports: [CommonModule, RouterLink, DsButtonComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonComponent implements OnInit, AfterViewInit {
  public readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private activeSection: HTMLElement | null = null;
  public activeFragment: string = '';

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  iconSvg: string = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  `;

  ngOnInit(): void {
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
