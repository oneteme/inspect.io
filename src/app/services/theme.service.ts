import { Injectable, signal, effect, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'inspect_theme';
  readonly themeMode = signal<ThemeMode>(this.getInitialTheme());
  private readonly systemIsDark = signal<boolean>(this.checkSystemDark());

  readonly isDark = computed(() => {
    const mode = this.themeMode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return this.systemIsDark();
  });

  constructor() {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.systemIsDark.set(e.matches);
      });
    }

    effect(() => {
      const dark = this.isDark();
      const mode = this.themeMode();
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (dark) {
          root.setAttribute('data-theme', 'dark');
          root.classList.add('dark', 'dark-theme');
          root.classList.remove('light');
        } else {
          root.setAttribute('data-theme', 'light');
          root.classList.add('light');
          root.classList.remove('dark', 'dark-theme');
        }
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, mode);
      }
    });
  }

  toggleTheme(): void {
    const next: ThemeMode = this.isDark() ? 'light' : 'dark';
    this.themeMode.set(next);
  }

  setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
  }

  private getInitialTheme(): ThemeMode {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return 'light'; // Remove dark theme temporarily
      }
    }
    return 'auto';
  }

  private checkSystemDark(): boolean {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }
}
