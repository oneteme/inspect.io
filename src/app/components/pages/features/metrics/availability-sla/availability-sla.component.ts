import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ElementRef,
  DestroyRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapShieldCheck,
  bootstrapSpeedometer2,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapHeartPulseFill,
  bootstrapClockHistory,
  bootstrapActivity,
  bootstrapExclamationTriangleFill
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { ScrollspyService } from '@services/scrollspy.service';
import { goToPage } from '@utils/utils';

@Component({
  selector: 'app-availability-sla',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './availability-sla.component.html',
  styleUrls: ['./availability-sla.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapShieldCheck,
      bootstrapSpeedometer2,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapHeartPulseFill,
      bootstrapClockHistory,
      bootstrapActivity,
      bootstrapExclamationTriangleFill
    })
  ]
})
export class AvailabilitySlaComponent implements AfterViewInit, OnDestroy {

  private scrollspyObserver?: IntersectionObserver;

  constructor(private router: Router,
              private elementRef: ElementRef,
              private scrollSpy: ScrollspyService,
              private destroyRef: DestroyRef) {}
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

      const revealElements = this.elementRef.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element: Element) => observer.observe(element));

      const spySections = [
        { selector: 'app-availability-sla', path: '/features/metrics/availability' },
        { selector: 'app-performance-response', path: '/features/metrics/performance' },
        { selector: 'app-volume-throughput', path: '/features/metrics/volume' },
        { selector: 'app-system-resources', path: '/features/metrics/resources' }
      ];

      // Automatically activate and expand the section upon entering
      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/metrics')) {
        this.scrollSpy.setActivePath('/features/metrics/availability');
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
        const el = this.elementRef.nativeElement.querySelector(selector);
        if (el) this.scrollspyObserver?.observe(el);
      });
    }
  }


  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/metrics/performance');
  }


  goToMetrics(): void {
    goToPage(this.isTransitioning(), this.router, '/features/metrics');
  }

  ngOnDestroy() {
    this.scrollspyObserver?.disconnect();
    this.scrollSpy.setActivePath(null);
  }
}
