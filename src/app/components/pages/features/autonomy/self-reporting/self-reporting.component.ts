import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapActivity,
  bootstrapCpuFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapShieldCheck,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapExclamationTriangleFill,
  bootstrapHddNetworkFill,
  bootstrapGraphUp,
  bootstrapPieChartFill,
  bootstrapHeartPulseFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { ScrollspyService } from '@services/scrollspy.service';

interface CollectorHealthState {
  collectorStatus: 'HEALTHY' | 'DEGRADED' | 'CIRCUIT_OPEN';
  queueCapacity: number;
  queueOccupancy: number;
  cpuOverheadPct: number;
  memoryOverheadMB: number;
  eventsDispatchedPerSec: number;
  circuitBreakerTripped: boolean;
  droppedEventsCount: number;
}

@Component({
  selector: 'app-self-reporting',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './self-reporting.component.html',
  styleUrls: ['./self-reporting.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapActivity,
      bootstrapCpuFill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapShieldCheck,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapExclamationTriangleFill,
      bootstrapHddNetworkFill,
      bootstrapGraphUp,
      bootstrapPieChartFill,
      bootstrapHeartPulseFill,
    })
  ]
})
export class SelfReportingComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  private observer?: IntersectionObserver;

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
      const sections = [
        { selector: 'app-data-partitioning', path: '/features/autonomy/partitioning' },
        { selector: 'app-smart-retention', path: '/features/autonomy/purge' },
        { selector: 'app-self-reporting', path: '/features/autonomy/self-reporting' },
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
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }


  goToInstallation(): void {
    this.router.navigate(['/installation']);
  }

  goToAutonomy(): void {
    this.router.navigate(['/features/autonomy']);
  }


}
