import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent {
  private propertyService = inject(PropertyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.propertyService.getProperties().subscribe(() => {
      //console.log(this.roomService.roomsJWT());
    });
  }

  public property = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.propertyService.getPropertyById(id))
    )
  );

  onNoClick() {
    this.router.navigate(['/publish/properties']);
  }
}
