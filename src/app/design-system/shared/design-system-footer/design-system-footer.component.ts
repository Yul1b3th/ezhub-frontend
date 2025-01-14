import { Component } from '@angular/core';

@Component({
  selector: 'design-system-footer',
  imports: [],
  templateUrl: './design-system-footer.component.html',
  styleUrl: './design-system-footer.component.scss',
})
export class DesignSystemFooterComponent {
  year = new Date().getFullYear();
}
