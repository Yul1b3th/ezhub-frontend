import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-ds-carousel2',
  imports: [CommonModule],
  templateUrl: './ds-carousel2.component.html',
  styleUrls: ['./ds-carousel2.component.scss'],
})
export class DsCarousel2Component implements OnInit, AfterViewInit {
  @ViewChild('track', { static: false }) track!: ElementRef<HTMLDivElement>;

  items = [
    'https://ezhub.vercel.app/assets/img/bedrooms/1.jpg',
    'https://ezhub.vercel.app/assets/img/bedrooms/2.jpg',
    'https://ezhub.vercel.app/assets/img/bedrooms/3.jpg',
  ];

  currentIndex = 0;

  ngOnInit(): void {
    // this.startAutoSlide();
  }

  ngAfterViewInit() {
    // Asignar la clase active directamente al primer elemento
    const items = this.track.nativeElement.children;
    if (items.length > 0) {
      items[0].classList.add('active'); // currentIndex
    }
  }

  next() {
    const items = this.track.nativeElement.children;
    const totalItems = items.length;

    if (totalItems > 0) {
      const currentItem = items[this.currentIndex];
      const nextIndex = (this.currentIndex + 1) % totalItems;
      const nextItem = items[nextIndex];

      nextItem.classList.add('carousel-item-next');
      setTimeout(() => {
        currentItem.classList.add('carousel-item-start');
        nextItem.classList.add('carousel-item-start');
      }, 50);

      setTimeout(() => {
        currentItem.classList.remove('active', 'carousel-item-start');
        nextItem.classList.remove('carousel-item-next', 'carousel-item-start');
        nextItem.classList.add('active');
        this.currentIndex = nextIndex;
      }, 800); // Duración de la transición
    }
  }

  prev() {
    const items = this.track.nativeElement.children;
    const totalItems = items.length;

    if (totalItems > 0) {
      const currentItem = items[this.currentIndex];
      const prevIndex = (this.currentIndex - 1 + totalItems) % totalItems;
      const prevItem = items[prevIndex];

      currentItem.classList.add('carousel-item-start');
      prevItem.classList.add('carousel-item-prev', 'carousel-item-start');

      setTimeout(() => {
        currentItem.classList.remove('active', 'carousel-item-start');
        prevItem.classList.remove('carousel-item-prev', 'carousel-item-start');
        prevItem.classList.add('active');
        this.currentIndex = prevIndex;
      }, 600); // Duración de la transición
    }
  }
}
