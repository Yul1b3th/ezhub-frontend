import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ds-carousel',
  imports: [CommonModule],
  templateUrl: './ds-carousel.component.html',
  styleUrl: './ds-carousel.component.scss',
})
export class DsCarouselComponent {
  slides = [
    { id: 0, content: 'First slide', color: '#777' },
    { id: 1, content: 'Second slide', color: '#666' },
    { id: 2, content: 'Third slide', color: '#555' },
  ];

  currentSlide = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 6000); // Cambiar cada 6 segundos
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.transitionSlide(this.currentSlide, next);
    this.currentSlide = next;
  }

  transitionSlide(currentIndex: number, nextIndex: number) {
    const carouselInner = document.querySelector(
      '.carousel-inner'
    ) as HTMLElement;
    const currentItem = carouselInner.children[currentIndex] as HTMLElement;
    const nextItem = carouselInner.children[nextIndex] as HTMLElement;

    currentItem.classList.add('carousel-item-start');
    nextItem.classList.add('carousel-item-next', 'carousel-item-start');

    setTimeout(() => {
      currentItem.classList.remove('active', 'carousel-item-start');
      nextItem.classList.remove('carousel-item-next', 'carousel-item-start');
      nextItem.classList.add('active');
    }, 600); // Duración de la transición
  }
}
