import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapArrowRight,
  bootstrapCheckCircleFill,
  bootstrapRocketTakeoffFill,
  bootstrapGlobe,
  bootstrapGearFill,
  bootstrapSpeedometer2,
  bootstrapCheck2Circle,
  bootstrapGraphUp,
  bootstrapHourglassSplit,
} from '@ng-icons/bootstrap-icons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';


@Component({
  selector: 'app-performance-response',
  imports: [CommonModule, TranslateModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
      bootstrapRocketTakeoffFill,
      bootstrapGlobe,
      bootstrapGearFill,
      bootstrapSpeedometer2,
      bootstrapCheck2Circle,
      bootstrapGraphUp,
      bootstrapHourglassSplit,
      hugeComputerProgramming01,
    }),
  ],
  templateUrl: './performance-response.component.html',
  styleUrls: ['./performance-response.component.scss'],
  standalone: true,
})
export class PerformanceResponseComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private scrollspyObserver?: IntersectionObserver;

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
        { selector: 'app-availability-sla', path: '/features/metrics/availability' },
        { selector: 'app-performance-response', path: '/features/metrics/performance' },
        { selector: 'app-volume-throughput', path: '/features/metrics/volume' },
        { selector: 'app-system-resources', path: '/features/metrics/resources' }
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/metrics')) {
        this.scrollSpy.setActivePath('/features/metrics/performance');
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

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/metrics/volume');
  }


  goToMetrics(): void {
    goToPage(this.isTransitioning(), this.router, '/features/metrics');
  }

  ngOnDestroy() {
    this.scrollspyObserver?.disconnect();
    this.scrollSpy.setActivePath(null);
  }
}
