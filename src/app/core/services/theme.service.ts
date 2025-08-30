import { Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly currentTheme = signal<'light-theme' | 'dark-theme'>('light-theme');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme') as 'light-theme' | 'dark-theme';
      if (storedTheme) {
        this.currentTheme.set(storedTheme);
      }
      document.body.classList.add(this.currentTheme());
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.platformId, this.currentTheme())
      const newTheme = this.currentTheme() === 'light-theme' ? 'dark-theme' : 'light-theme';
      document.body.classList.replace(this.currentTheme(), newTheme);
      this.currentTheme.set(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }
}
