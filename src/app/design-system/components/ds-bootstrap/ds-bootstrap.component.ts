import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'ds-bootstrap',
  imports: [CommonModule],
  templateUrl: './ds-bootstrap.component.html',
  styleUrls: ['./ds-bootstrap.component.scss'],
})
export class DsBootstrapComponent implements AfterViewInit {
  @Input() photos: string[] = [];
  @ViewChildren('carouselItem') carouselItems!: QueryList<ElementRef>;
  currentIndex = 0;
  private items: HTMLElement[] = [];
  private intervalId: any;
  private isSliding = false;
  public isPlaying = true;

  ngAfterViewInit() {
    this.items = this.carouselItems.toArray().map((item) => item.nativeElement);
    console.log('items', this.items);

    this.startAutoplay();
  }

  constructor(private cdr: ChangeDetectorRef) {
    console.log(this.currentIndex);
  }

  startAutoplay() {
    this.stopAutoplay(); // Detener cualquier autoplay previo
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
    this.isPlaying = true;
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  toggleAutoplay() {
    if (this.isPlaying) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
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
    if (this.isSliding) return;

    console.log(this.currentIndex);

    const nextIndex = (index + this.items.length) % this.items.length;
    if (nextIndex === this.currentIndex) return;

    this.isSliding = true;
    const currentItem = this.items[this.currentIndex];
    console.log('currentItem', currentItem);

    const nextItem = this.items[nextIndex];

    if (direction === 'left') {
      nextItem.classList.add('carousel-item-next');
    } else {
      nextItem.classList.add('carousel-item-prev');
    }

    setTimeout(() => {
      if (direction === 'left') {
        currentItem.classList.add('carousel-item-start');
        nextItem.classList.add('carousel-item-start');
      } else {
        currentItem.classList.add('carousel-item-end');
        nextItem.classList.add('carousel-item-end');
      }

      setTimeout(() => {
        currentItem.classList.remove(
          'active',
          'carousel-item-start',
          'carousel-item-end'
        );
        nextItem.classList.remove(
          'carousel-item-next',
          'carousel-item-prev',
          'carousel-item-start',
          'carousel-item-end'
        );
        nextItem.classList.add('active');

        this.currentIndex = nextIndex; // Actualiza el índice actual
        this.isSliding = false;
        this.cdr.detectChanges(); // Asegura que Angular detecte los cambios
      }, 600); // Duración de la transición
    }, 50); // Pequeño retraso para permitir la aplicación de clases
    console.log(this.currentIndex);
  }
}
