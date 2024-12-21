import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { DsCardComponent } from './components/ds-card/ds-card.component';
import { DsCarouselComponent } from './components/ds-carousel/ds-carousel.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, DsCardComponent, CarouselComponent],
})
export class DesignSystemComponent {}
