import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export default class DesignSystemComponent {}
