import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowRight,
  bootstrapCheckCircleFill,
  bootstrapRocketTakeoffFill,
  bootstrapGlobe,
  bootstrapGearFill,
  bootstrapPower,
  bootstrapCheck2Circle,
  bootstrapArrowDown,
  bootstrapLayersFill,
  bootstrapCardChecklist,
  bootstrapTransparency
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

export type ContextKey = 'api' | 'batch' | 'startup' | 'test';

@Component({
  selector: 'app-monitoring-event',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapTransparency,
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapPower,
      bootstrapCheck2Circle,
      hugeComputerProgramming01,
      bootstrapArrowDown,
      bootstrapLayersFill,
      bootstrapCardChecklist
    }),
  ],
  templateUrl: './monitoring-event.component.html',
  styleUrls: ['./monitoring-event.component.scss'],
  standalone: true,
})
export class MonitoringEventComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

  readonly selectedContext = signal<ContextKey>('api');
  readonly isTransitioning = signal(false);

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      const revealElements = this.el.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element: Element) => observer.observe(element));

      const spySections = [
        { selector: 'app-monitoring-events', path: '/features/monitoring/events' },
        { selector: 'app-monitoring-workflow', path: '/features/monitoring/workflow' },
        { selector: 'app-monitoring-user', path: '/features/monitoring/user' },
      ];

      // Automatically activate and expand the section upon entering
      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/monitoring')) {
        this.scrollSpy.setActivePath('/features/monitoring/events');
      }

      this.scrollspyObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const match = spySections.find((s) => entry.target.matches(s.selector));
              if (match) {
                this.scrollSpy.setActivePath(match.path);
              }
            }
          }
        },
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
      );

      spySections.forEach(({ selector }) => {
        const el = this.el.nativeElement.querySelector(selector);
        if (el) this.scrollspyObserver?.observe(el);
      });

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.scrollspyObserver?.disconnect();
        this.scrollSpy.setActivePath(null);
      });
    }
  }

  setContext(context: ContextKey): void {
    this.selectedContext.set(context);
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/monitoring/workflow');
  }

  goToMonitoring(): void {
    goToPage(this.isTransitioning(), this.router, '/features/monitoring');
  }
}
