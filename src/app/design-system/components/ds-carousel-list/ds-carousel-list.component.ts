import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef,
  Input,
  ChangeDetectorRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { interval, Subscription, timer, fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'ds-carousel-list',
  imports: [CommonModule],
  templateUrl: './ds-carousel-list.component.html',
  styleUrls: ['./ds-carousel-list.component.scss'],
})
export class DsCarouselListComponent implements AfterViewInit, OnDestroy {
  @Input() photos: string[] = [];
  @ViewChild('carouselInner', { static: true }) carouselInner!: ElementRef;
  @ViewChild('nextButton', { static: true }) nextButton!: ElementRef;
  @ViewChild('prevButton', { static: true }) prevButton!: ElementRef;
  private autoplaySubscription: Subscription | null = null;
  private clickSubscription: Subscription | null = null;
  private isAnimating = false;
  private isDragging = false;
  private startX = 0;
  private movedX = 0;
  private dragThreshold = 50;
  public isPlaying = true;
  public isPlayPress = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.startAutoplay();
    this.setupClickHandlers();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplaySubscription = interval(2000).subscribe(() =>
      this.nextSlide()
    );
    this.isPlaying = true;
  }

  stopAutoplay() {
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
      this.autoplaySubscription = null;
    }
    if (this.isPlaying && this.isPlayPress) {
      this.isPlaying = false;
    }
  }

  toggleAutoplay() {
    this.isPlayPress = !this.isPlayPress;
    this.isPlaying ? this.stopAutoplay() : this.startAutoplay();
  }

  nextSlide() {
    this.slideTo('next');
  }

  prevSlide() {
    this.slideTo('prev');
  }

  slideTo(direction: 'next' | 'prev') {
    if (this.isAnimating) return;

    const carousel = this.carouselInner.nativeElement;
    const scrollAmount = carousel.clientWidth;

    this.isAnimating = true;
    if (direction === 'next') {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    timer(600).subscribe(() => {
      this.isAnimating = false;
      this.cdr.detectChanges();
    });
  }

  @HostListener('mousedown', ['$event'])
  startDrag(event: MouseEvent) {
    if (this.isAnimating) return;
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.movedX = 0;
    document.body.style.cursor = 'grabbing';
  }

  @HostListener('mousemove', ['$event'])
  drag(event: MouseEvent) {
    if (!this.isDragging || this.isAnimating) return;
    this.movedX = event.clientX - this.startX;
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  endDrag() {
    if (this.isAnimating) return;
    this.isDragging = false;
    document.body.style.cursor = 'default';
    const deltaX = this.movedX;

    if (Math.abs(deltaX) > this.dragThreshold) {
      deltaX > 0 ? this.prevSlide() : this.nextSlide();
    }
  }

  setupClickHandlers() {
    const nextClick$ = fromEvent(this.nextButton.nativeElement, 'click').pipe(
      auditTime(700)
    );
    const prevClick$ = fromEvent(this.prevButton.nativeElement, 'click').pipe(
      auditTime(700)
    );

    this.clickSubscription = nextClick$.subscribe(() => this.nextSlide());
    this.clickSubscription.add(prevClick$.subscribe(() => this.prevSlide()));
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isPlaying && !this.isPlayPress) {
      this.stopAutoplay();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isPlaying && !this.isPlayPress) {
      this.startAutoplay();
    }
  }
}
