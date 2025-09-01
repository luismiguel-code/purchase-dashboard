import { Component, HostBinding } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: '<app-layout></app-layout>',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'purchase-dashboard';

  @HostBinding('class') get themeClass() {
    return this.themeService.currentTheme();
  }

  constructor(private themeService: ThemeService) {}
}
