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
  public deleteModalOpen = false;
  public propertyToDelete: number | null = null;

  constructor() {
    this.propertyService.getProperties().subscribe(() => {
      //console.log(this.propertyService.propertiesJWT());
    });
  }

  onDeleteRoom(propertyId: number) {
    this.deleteModalOpen = true;
    this.propertyToDelete = propertyId;
  }

  confirmDelete() {
    if (this.propertyToDelete !== null) {
      this.propertyService
        .deletePropertybyIDJWT(this.propertyToDelete)
        .subscribe(
          () => {
            this.deleteModalOpen = false;
            this.propertyToDelete = null;
            this.propertyService.getProperties().subscribe();
          },
          (error) => {
            console.error('Error deleting property:', error);
          }
        );
    }
  }

  cancelDelete() {
    this.deleteModalOpen = false;
    this.propertyToDelete = null;
  }
}
