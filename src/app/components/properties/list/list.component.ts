import { Component, inject } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { Property } from '../../../interfaces/property.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export default class ListComponent {
  public propertyService = inject(PropertyService);
  constructor() {
    this.propertyService.getProperties().subscribe(() => {
      //console.log(this.propertyService.propertiesJWT());
    });
  }

  onAddRoom() {}

  onViewRoom(property: Property) {}

  onEditRoom(property: Property) {}

  onDeleteRoom() {}
}
