import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'ds-scroll-top-button',
  imports: [],
  templateUrl: './ds-scroll-top-button.component.html',
  styleUrl: './ds-scroll-top-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsScrollTopButtonComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isVisible = scrollTop > 200;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
