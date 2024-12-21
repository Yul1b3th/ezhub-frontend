import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef,
  ViewContainerRef,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-carousel.component.html',
  styleUrls: ['./ds-carousel.component.scss'],
})
export class DsCarouselComponent implements AfterContentInit {
  @ContentChildren('carouselItem', { read: TemplateRef }) items!: QueryList<
    TemplateRef<any>
  >;
  currentIndex = signal(0);

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngAfterContentInit() {
    if (
      this.items &&
      this.items.length > 0 &&
      this.currentIndex() >= this.items.length
    ) {
      this.currentIndex.set(0);
    }
    this.renderCurrentItem();
  }

  renderCurrentItem() {
    if (this.items && this.items.length > 0) {
      this.viewContainerRef.clear();
      const currentItem = this.items.toArray()[this.currentIndex()];
      this.viewContainerRef.createEmbeddedView(currentItem);
    }
  }

  get isPrevDisabled() {
    return this.currentIndex() === 0;
  }

  get isNextDisabled() {
    return this.currentIndex() === this.items.length - 1;
  }

  prevImage() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((index) => index - 1);
      this.renderCurrentItem();
    }
  }

  nextImage() {
    if (this.currentIndex() < this.items.length - 1) {
      this.currentIndex.update((index) => index + 1);
      this.renderCurrentItem();
    }
  }

  goToImage(index: number) {
    this.currentIndex.set(index);
    this.renderCurrentItem();
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.currentIndex().toString());
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const newIndex = parseInt(
      event.dataTransfer?.getData('text/plain') || '0',
      10
    );
    this.goToImage(newIndex);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
