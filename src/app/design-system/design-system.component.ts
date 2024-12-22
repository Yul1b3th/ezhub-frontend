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
import { CarouselComponent } from './components/carousel/carousel.component';
import { DsCarouselComponent } from './components/ds-carousel/ds-carousel.component';
import { DsCarousel2Component } from './components/ds-carousel2/ds-carousel2.component';
import { DsBootstrapComponent } from './components/ds-bootstrap/ds-bootstrap.component';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DsCardComponent,
    CarouselComponent,
    DsCarouselComponent,
    DsCarousel2Component,
    DsBootstrapComponent,
  ],
})
export class DesignSystemComponent {}
