import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapRocketTakeoffFill,
  bootstrapArrowRight,
  bootstrapEyeFill,
  bootstrapActivity,
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapArrowDown,
  bootstrapChevronDown,
} from '@ng-icons/bootstrap-icons';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

@Component({
  selector: 'app-features',
  imports: [
    TranslateModule,
    NgIcon,
  ],
  providers: [
    provideIcons({
      bootstrapRocketTakeoffFill,
      bootstrapArrowRight,
      bootstrapEyeFill,
      bootstrapActivity,
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapArrowDown,
      bootstrapChevronDown,
    }),
  ],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  standalone: true,
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);
  readonly isScrollDownVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    isScrollDownVisible: this.isScrollDownVisible,
    onNavigateUp: () => this.goToHome(),
    onNavigateDown: () => this.goToNext(),
  });

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const sections = [
      { selector: 'app-monitoring', path: '/features/monitoring' },
      { selector: 'app-e2e', path: '/features/e2e' },
      { selector: 'app-metrics', path: '/features/metrics' },
      { selector: 'app-health', path: '/features/health' },
      { selector: 'app-autonomy', path: '/features/autonomy' },
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
    goToPage(this.isTransitioning(), this.router, '/features/monitoring');
  }


  goToHome(): void {
    goToPage(this.isTransitioning(), this.router, '/');
  }

}
