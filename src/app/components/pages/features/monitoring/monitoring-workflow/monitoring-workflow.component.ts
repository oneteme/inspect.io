import { Component, signal, ChangeDetectionStrategy, AfterViewInit, inject, ElementRef, DestroyRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDiagram3Fill,
  bootstrapDatabaseFill,
  bootstrapEnvelopeFill,
  bootstrapFolderFill,
  bootstrapPeopleFill,
  bootstrapGlobe2,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapSpeedometer2,
  bootstrapClockHistory,
  bootstrapExclamationTriangleFill,
  bootstrapLayersFill, bootstrapArrowDown
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

@Component({
  selector: 'app-monitoring-workflow',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './monitoring-workflow.component.html',
  styleUrls: ['./monitoring-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapDatabaseFill,
      bootstrapEnvelopeFill,
      bootstrapFolderFill,
      bootstrapGlobe2,
      bootstrapLayersFill
    })
  ]
})
export class MonitoringWorkflowComponent implements AfterViewInit, OnDestroy {

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
        { selector: 'app-monitoring-events', path: '/features/monitoring/events' },
        { selector: 'app-monitoring-workflow', path: '/features/monitoring/workflow' },
        { selector: 'app-monitoring-user', path: '/features/monitoring/user' },
      ];

      // Automatically activate and expand the section upon entering
      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/monitoring')) {
        this.scrollSpy.setActivePath('/features/monitoring/workflow');
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


  goToMonitoring(): void {
    goToPage(this.isTransitioning(), this.router, '/features/monitoring');
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/monitoring/user');
  }


  ngOnDestroy() {
    this.scrollspyObserver?.disconnect();
    this.scrollSpy.setActivePath(null);
  }
}
