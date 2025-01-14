import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DesignSystemSidebarComponent } from './shared/design-system-sidebar/design-system-sidebar.component';
import { DesignSystemFooterComponent } from './shared/design-system-footer/design-system-footer.component';
import { DesignSystemHeaderComponent } from './shared/design-system-header/design-system-header.component';
import { DsScrollTopButtonComponent } from './components/ds-scroll-top-button/ds-scroll-top-button.component';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterOutlet,
    DesignSystemSidebarComponent,
    DesignSystemFooterComponent,
    DesignSystemHeaderComponent,
    DsScrollTopButtonComponent,
  ],
})
export default class DesignSystemComponent {
  public readonly themeService = inject(ThemeService);
}
