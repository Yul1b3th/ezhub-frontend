import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ButtonComponent } from './components/button/button.component';
import { DsCardComponent } from './components/ds-card/ds-card.component';
import { DsBootstrapComponent } from './components/ds-bootstrap/ds-bootstrap.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    DsCardComponent,
    DsBootstrapComponent,
    NavBarComponent,
  ],
})
export class DesignSystemComponent {}
