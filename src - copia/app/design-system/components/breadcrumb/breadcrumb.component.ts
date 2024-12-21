import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ds-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/category' },
    { label: 'Product', link: '/category/product' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
