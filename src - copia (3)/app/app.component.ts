import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './design-system/services/theme.service';
import { ButtonComponent } from './design-system/components/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  isDarkMode = false;
  title = 'ezhub';

  ngOnInit(): void {
    //this.isDarkMode = this.themeService.theme() === 'dark-mode';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    //this.isDarkMode = !this.isDarkMode;
  }
}
