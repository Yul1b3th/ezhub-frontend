import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly defaultTheme: string = 'auto-mode';
  private readonly themeStorageKey: string = 'theme';
  private currentTheme = signal<string>(this.defaultTheme);

  constructor() {
    const savedTheme = this.getSavedTheme();
    this.applyTheme(savedTheme || this.defaultTheme);
  }

  get theme(): Signal<string> {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
    if (this.isValidTheme(theme)) {
      this.applyTheme(theme);
    } else {
      console.warn(`Invalid theme: ${theme}`);
    }
  }

  toggleTheme(): void {
    const newTheme =
      this.currentTheme() === 'light-mode'
        ? 'dark-mode'
        : this.currentTheme() === 'dark-mode'
          ? 'auto-mode'
          : 'light-mode';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: string): void {
    if (theme === 'auto-mode') {
      const preferredTheme = this.getPreferredTheme();
      this.updateBodyClass(preferredTheme);
    } else {
      this.updateBodyClass(theme);
    }
    this.currentTheme.set(theme);
    this.saveTheme(theme);
  }

  private getSavedTheme(): string | null {
    return localStorage.getItem(this.themeStorageKey);
  }

  private saveTheme(theme: string): void {
    localStorage.setItem(this.themeStorageKey, theme);
  }

  private updateBodyClass(theme: string): void {
    document.body.classList.remove('light-mode', 'dark-mode');
    if (theme !== 'auto-mode') {
      document.body.classList.add(theme);
    } else {
      const preferredTheme = this.getPreferredTheme();
      document.body.classList.add(preferredTheme);
    }
  }

  private isValidTheme(theme: string): boolean {
    return (
      theme === 'light-mode' || theme === 'dark-mode' || theme === 'auto-mode'
    );
  }

  private getPreferredTheme(): string {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-mode'
      : 'light-mode';
  }
}
