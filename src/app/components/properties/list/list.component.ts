import { Component, inject } from '@angular/core';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  public propertyService = inject(PropertyService);
}
