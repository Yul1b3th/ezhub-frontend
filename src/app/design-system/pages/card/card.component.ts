import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsCardComponent } from '@design-system/components/ds-card/ds-card.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'card',
  imports: [CommonModule, DsCardComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardComponent {
  public readonly themeService = inject(ThemeService);

  public cardData = [
    {
      header: 'Card with Title and Text',
      title: 'Card Title',
      body: 'This is an example of a card with a title and text.',
    },
    {
      header: 'Card with Image, Title and Text',
      imageUrl: 'https://ezhub.vercel.app/assets/img/bedrooms/1.jpg',
      title: 'Card Title',
      body: 'This is an example of a card with an image, title, and text.',
    },
    {
      header: 'Card with Title, Text and Button',
      title: 'Card Title',
      body: 'This is an example of a card with a title, text, and button.',
      buttonText: 'Read More',
      buttonUrl: '#',
      buttonTarget: '_blank' as '_blank',
    },
    {
      header: 'Card with Image, Title, Text and Button',
      imageUrl: 'https://ezhub.vercel.app/assets/img/bedrooms/1.jpg',
      title: 'Card Title',
      body: 'This is an example of a card with an image, title, text, and button.',
      buttonText: 'Read More',
      buttonUrl: '#',
      buttonTarget: '_blank' as '_blank',
    },
    {
      header: 'Card with Header and Footer',
      title: 'Card Title',
      body: 'This is an example of a card with a header and footer.',
      footer: 'Card Footer',
    },
    {
      header: 'Card with Projected Content',
      title: 'Card Title',
      footer: 'Card Footer',
    },
  ];
}
