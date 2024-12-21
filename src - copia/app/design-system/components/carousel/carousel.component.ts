import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
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
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() photos: string[] = [];

  currentPhotos: string[] = [];

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
    direction === 'left' ? this.rotateLeft() : this.rotateRight();

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

  rotateLeft() {
    const firstPhoto = this.currentPhotos.shift();
    if (firstPhoto) {
      this.currentPhotos.push(firstPhoto);
      this.currentPhotos = [...this.currentPhotos]; // Crea una nueva referencia del arreglo
      this.currentIndex = (this.currentIndex + 1) % this.currentPhotos.length;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  rotateRight() {
    const lastPhoto = this.currentPhotos.pop();
    if (lastPhoto) {
      this.currentPhotos.unshift(lastPhoto);
      this.currentPhotos = [...this.currentPhotos]; // Crea una nueva referencia del arreglo
      this.currentIndex =
        (this.currentIndex - 1 + this.currentPhotos.length) %
        this.currentPhotos.length;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  startAutoplay() {
    if (this.isPaused) return;
    this.stopAutoplay(); // Asegura que no haya intervalos duplicados
    this.autoplayInterval = setInterval(() => {
      this.rotateLeft(); // Cambia automáticamente cada 5 segundos
    }, 6000);
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

  goToImage(index: number) {
    this.currentIndex = index;
    this.currentPhotos = [
      ...this.photos.slice(index),
      ...this.photos.slice(0, index),
    ];
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  get isPrevDisabled() {
    return this.currentPhotos.length <= 1;
  }

  get isNextDisabled() {
    return this.currentPhotos.length <= 1;
  }
}
