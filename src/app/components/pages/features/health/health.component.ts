import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollspyService } from '@services/scrollspy.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { goToPage } from '@utils/utils';
import { Router } from '@angular/router';
import { bootstrapArrowDown } from '@ng-icons/bootstrap-icons';

@Component({
  imports: [TranslateModule, NgIcon],
  selector: 'app-health',
  styleUrls: ['./health.component.scss'],
  templateUrl: './health.component.html',
  standalone: true,
  providers: [
    provideIcons({
      bootstrapArrowDown,
    }),
  ],
})
export class HealthComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

  readonly isTransitioning = signal(false);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const sections = [
      { selector: 'app-application-inventory', path: '/features/health/inventory' },
      { selector: 'app-lifecycle-events', path: '/features/health/events' },
    ];

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sections.find((s) => entry.target.matches(s.selector));
            if (match) {
              this.scrollSpy.setActivePath(match.path);
            }
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(({ selector }) => {
      const el = this.elementRef.nativeElement.querySelector(selector);
      if (el) this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/health/inventory');
  }

}
