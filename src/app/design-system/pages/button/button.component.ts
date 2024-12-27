import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DsButtonComponent } from '@design-system/components/ds-button/ds-button.component';

@Component({
  selector: 'page-button',
  imports: [DsButtonComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonComponent {}
