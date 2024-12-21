import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent {
  photos: string[] = [
    'https://ezhub.vercel.app/assets/img/bedrooms/1.jpg',
    'https://ezhub.vercel.app/assets/img/bedrooms/2.jpg',
    'https://ezhub.vercel.app/assets/img/bedrooms/3.jpg',
  ];
  currentIndex = signal<number>(0);

  nextImage() {
    this.currentIndex.set((this.currentIndex() + 1) % this.photos.length);
  }

  prevImage() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.photos.length) % this.photos.length
    );
  }
}
