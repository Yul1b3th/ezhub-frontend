import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export default class PublishComponent {}
