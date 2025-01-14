import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'ds-card-skeleton',
  imports: [CommonModule],
  templateUrl: './ds-card-skeleton.component.html',
  styleUrls: ['./ds-card-skeleton.component.scss'],
})
export class DsCardSkeletonComponent implements AfterContentInit {
  @ContentChildren('cardHeader', { read: ElementRef })
  cardHeaderElements!: QueryList<ElementRef>;
  @ContentChildren('cardImage', { read: ElementRef })
  cardImageElements!: QueryList<ElementRef>;
  @ContentChildren('cardTitle', { read: ElementRef })
  cardTitleElements!: QueryList<ElementRef>;
  @ContentChildren('cardBody', { read: ElementRef })
  cardBodyElements!: QueryList<ElementRef>;
  @ContentChildren('cardDescription', { read: ElementRef })
  cardDescriptionElements!: QueryList<ElementRef>;
  @ContentChildren('cardPrice', { read: ElementRef })
  cardPriceElements!: QueryList<ElementRef>;
  @ContentChildren('cardButton', { read: ElementRef })
  cardButtonElements!: QueryList<ElementRef>;
  @ContentChildren('cardFooter', { read: ElementRef })
  cardFooterElements!: QueryList<ElementRef>;

  public hasCardHeader = false;
  public hasCardImage = false;
  public hasCardTitle = false;
  public hasCardBody = false;
  public hasCardDescription = false;
  public hasCardPrice = false;
  public hasCardButton = false;
  public hasCardFooter = false;

  ngAfterContentInit(): void {
    this.hasCardHeader = this.cardHeaderElements.length > 0;
    this.hasCardImage = this.cardImageElements.length > 0;
    this.hasCardTitle = this.cardTitleElements.length > 0;
    this.hasCardBody = this.cardBodyElements.length > 0;
    this.hasCardDescription = this.cardDescriptionElements.length > 0;
    this.hasCardPrice = this.cardPriceElements.length > 0;
    this.hasCardButton = this.cardButtonElements.length > 0;
    this.hasCardFooter = this.cardFooterElements.length > 0;
  }
}
