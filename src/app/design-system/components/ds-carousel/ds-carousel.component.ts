import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { fromEvent, interval, Subscription, throttleTime, timer } from 'rxjs';

@Component({
  selector: 'ds-carousel',
  imports: [CommonModule],
  templateUrl: './ds-carousel.component.html',
  styleUrl: './ds-carousel.component.scss',
})
export class DsCarouselComponent implements AfterViewInit, OnDestroy {
  @Input() photos: string[] = [];
  @ViewChildren('carouselItem') carouselItems!: QueryList<ElementRef>;
  @ViewChild('nextButton', { static: true }) nextButton!: ElementRef;
  @ViewChild('prevButton', { static: true }) prevButton!: ElementRef;
  @ViewChild('toggleAutoplayButton', { static: true })
  toggleAutoplayButton!: ElementRef;
  currentIndex = 0;
  private items: HTMLElement[] = [];
  private autoplaySubscription: Subscription | null = null;
  private clickSubscription: Subscription | null = null;
  private isSliding = false;
  private isAnimating = false;
  private isDragging = false;
  private startX = 0;
  private movedX = 0;
  private dragThreshold = 50;
  public isPlaying = true;
  public isPlayPress = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.items = this.carouselItems.toArray().map((item) => item.nativeElement);
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
    this.autoplaySubscription = interval(5000).subscribe(() =>
      this.nextSlide(),
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
    this.slideTo(this.currentIndex + 1, 'left');
  }

  prevSlide() {
    this.slideTo(this.currentIndex - 1, 'right');
  }

  goToSlide(index: number) {
    const direction = index > this.currentIndex ? 'left' : 'right';
    this.slideTo(index, direction);
  }

  slideTo(index: number, direction: 'left' | 'right') {
    if (this.isSliding || this.isAnimating) return;

    const nextIndex = (index + this.items.length) % this.items.length;
    if (nextIndex === this.currentIndex) return;

    this.isSliding = true;
    this.isAnimating = true;
    const currentItem = this.items[this.currentIndex];
    const nextItem = this.items[nextIndex];

    if (direction === 'left') {
      nextItem.classList.add('carousel-item-next');
    } else {
      nextItem.classList.add('carousel-item-prev');
    }

    timer(50).subscribe(() => {
      if (direction === 'left') {
        currentItem.classList.add('carousel-item-start');
        nextItem.classList.add('carousel-item-start');
      } else {
        currentItem.classList.add('carousel-item-end');
        nextItem.classList.add('carousel-item-end');
      }

      timer(600).subscribe(() => {
        currentItem.classList.remove(
          'active',
          'carousel-item-start',
          'carousel-item-end',
        );
        nextItem.classList.remove(
          'carousel-item-next',
          'carousel-item-prev',
          'carousel-item-start',
          'carousel-item-end',
        );
        nextItem.classList.add('active');

        this.currentIndex = nextIndex;
        this.isSliding = false;
        this.isAnimating = false;
        this.cdr.detectChanges();
      });
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

    // Controlar el evento mousemove con throttleTime
    fromEvent(document, 'mousemove')
      .pipe(throttleTime(50))
      .subscribe((moveEvent: any) => this.drag(moveEvent));
  }

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
      throttleTime(700),
    );
    const prevClick$ = fromEvent(this.prevButton.nativeElement, 'click').pipe(
      throttleTime(700),
    );
    const toggleAutoplayClick$ = fromEvent(
      this.toggleAutoplayButton.nativeElement,
      'click',
    ).pipe(throttleTime(700));

    this.clickSubscription = nextClick$.subscribe(() => this.nextSlide());
    this.clickSubscription.add(prevClick$.subscribe(() => this.prevSlide()));
    this.clickSubscription.add(
      toggleAutoplayClick$.subscribe(() => this.toggleAutoplay()),
    );
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
