import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  private readonly translate = inject(TranslateService);
  readonly themeService = inject(ThemeService);

  @Output() searchOpen = new EventEmitter<void>();

  readonly isFirefox = typeof navigator !== 'undefined' && /Firefox\//.test(navigator.userAgent);
  readonly repoMenuOpen = signal(false);
  readonly currentLang = signal(this.translate.currentLang || this.translate.defaultLang || 'en');
  readonly isDark = this.themeService.isDark;

  // Redirect to the latest version of each component on Docker Hub, Maven Central, and npm
  readonly menuItems = [
    { label: 'inspect-app', link: 'https://hub.docker.com/r/oneteme/inspect-app/tags' },
    {
      label: 'inspect-core',
      link: 'https://mvnrepository.com/artifact/io.github.oneteme/inspect-core/versions',
    },
    {
      label: 'inspect-ng-collector',
      link: 'https://www.npmjs.com/package/@oneteme/inspect-ng-collector?activeTab=versions',
    },
    { label: 'inspect-server', link: 'https://hub.docker.com/r/oneteme/inspect-server/tags' },
  ];

  constructor() {
    this.translate.addLangs(['fr', 'en']);
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  trackByLabel(index: number, item: { label: string; link: string }): string {
    return item.label;
  }

  toggleMenu(): void {
    this.repoMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.repoMenuOpen.set(false);
  }

  openSearch() {
    this.searchOpen.emit();
  }

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'fr' ? 'en' : 'fr';
    this.translate.use(nextLang).subscribe();
  }

  goHome(): void {
    window.location.assign('/inspect.io/');
  }

  goToGithub() {
    window.open('https://github.com/oneteme', '_blank');
  }
}
