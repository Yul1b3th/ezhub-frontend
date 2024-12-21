import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() photos: string[] = [];

  currentPhotos: string[] = [];
  translateX = 0; // Propiedad para manejar la transformación

  @ViewChild('track', { static: false }) track!: ElementRef<HTMLDivElement>;
  hoveredImageIndex: number | null = null;
  currentIndex = 0;
  isPaused = false; // Propiedad para controlar el estado de pausa

  private isDragging = false;
  private startX = 0;
  private movedX = 0;
  private dragThreshold = 50;
  private autoplayInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentPhotos = [...this.photos]; // Inicializar currentPhotos con una copia de photos
    this.startAutoplay(); // Inicia el autoplay al cargar
  }

  ngAfterViewInit() {
    // Añadir la clase active a la primera imagen
    if (this.track && this.track.nativeElement.children.length > 0) {
      const prev = this.track.nativeElement.children.length - 1;
      this.track.nativeElement.children[prev].classList.add(
        'carousel-item-prev'
      );
      this.track.nativeElement.children[0].classList.add('active');
      this.track.nativeElement.children[1].classList.add('carousel-item-next');
    }
  }

  ngOnDestroy() {
    this.stopAutoplay(); // Detiene el autoplay al destruir el componente
  }

  startDrag(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.movedX = 0;
    this.track.nativeElement.style.cursor = 'grabbing';
    this.stopAutoplay(); // Pausa el autoplay durante el arrastre
  }

  drag(event: MouseEvent) {
    if (!this.isDragging) return;

    this.movedX = event.clientX - this.startX;
    if (Math.abs(this.movedX) < this.dragThreshold) return;

    const direction = this.movedX < 0 ? 'left' : 'right';
    direction === 'left' ? this.translateLeft() : this.translateRight();

    this.isDragging = false;
  }

  endDrag() {
    this.isDragging = false;
    this.track.nativeElement.style.cursor = 'grab';
    if (Math.abs(this.movedX) < this.dragThreshold) this.movedX = 0;
    if (!this.isPaused) {
      this.startAutoplay(); // Reanuda el autoplay al soltar el mouse si no está en pausa
    }
  }

  translateLeft() {
    const nextIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateClasses(this.currentIndex, nextIndex, 'left');
    this.currentIndex = nextIndex;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  translateRight() {
    const prevIndex =
      (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateClasses(this.currentIndex, prevIndex, 'right');
    this.currentIndex = prevIndex;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  goToImage(target: number) {
    if (target === this.currentIndex) return; // Si el target es el mismo, no hacer nada

    const direction = target > this.currentIndex ? 'left' : 'right';
    this.updateClasses(this.currentIndex, target, direction);

    this.currentIndex = target;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  updateClasses(currentIndex: number, target: number, direction: string) {
    const items = this.track.nativeElement.children;

    // Eliminar todas las clases del currentIndex y target
    items[currentIndex].classList.remove(
      'active',
      'carousel-item-start',
      'carousel-item-end',
      'carousel-item-next',
      'carousel-item-prev'
    );
    items[target].classList.remove(
      'active',
      'carousel-item-start',
      'carousel-item-end',
      'carousel-item-next',
      'carousel-item-prev'
    );

    // Añadir clases temporales para animación
    if (direction === 'left') {
      items[target].classList.add('carousel-item-next');
      items[currentIndex].classList.add('carousel-item-start');
    } else {
      items[target].classList.add('carousel-item-prev');
      items[currentIndex].classList.add('carousel-item-end');
    }

    // Añadir la clase active al nuevo elemento antes de la transición
    setTimeout(() => {
      items[target].classList.add('active');
    }, 0);

    // Añadir la clase carousel-item-prev al elemento anterior de target
    const prev = (target - 1 + items.length) % items.length;
    items[prev].classList.add('carousel-item-prev');

    // Añadir la clase carousel-item-next al elemento siguiente de target
    const next = (target + 1) % items.length;
    items[next].classList.add('carousel-item-next');

    // Eliminar la clase carousel-item-prev del elemento anterior de currentIndex
    const prevCurrent = (currentIndex - 1 + items.length) % items.length;
    items[prevCurrent].classList.remove('carousel-item-prev');

    // Eliminar la clase carousel-item-next del elemento siguiente de currentIndex
    const nextCurrent = (currentIndex + 1) % items.length;
    items[nextCurrent].classList.remove('carousel-item-next');

    // Limpia clases al finalizar transición
    setTimeout(() => {
      items[currentIndex].classList.remove(
        'carousel-item-start',
        'carousel-item-end'
      );
      items[target].classList.remove(
        'carousel-item-next',
        'carousel-item-prev'
      );
    }, 600); // Duración de la transición
  }

  startAutoplay() {
    if (this.isPaused) return;
    this.stopAutoplay(); // Asegura que no haya intervalos duplicados
    this.autoplayInterval = setInterval(() => {
      this.translateLeft(); // Cambia automáticamente cada 10 segundos
    }, 10000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  setHoveredImageIndex(index: number) {
    this.hoveredImageIndex = index;
    this.stopAutoplay(); // Pausa el autoplay al pasar el mouse
  }

  clearHoveredImageIndex() {
    this.hoveredImageIndex = null;
    if (!this.isPaused) {
      this.startAutoplay(); // Reanuda el autoplay al salir del mouse si no está en pausa
    }
  }

  get isPrevDisabled() {
    return this.photos.length <= 1;
  }

  get isNextDisabled() {
    return this.photos.length <= 1;
  }
}
