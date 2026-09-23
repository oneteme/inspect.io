import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDatabaseFill,
  bootstrapCalendarCheckFill,
  bootstrapLightningChargeFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapShieldCheck,
  bootstrapArrowDown,
  bootstrapCpuFill,
  bootstrapHddStackFill,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapLayersFill,
  bootstrapClockHistory,
  bootstrapDiagram3Fill,
  bootstrapGearFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';

interface PartitionInfo {
  tableName: string;
  partitionStrategy: 'MONTHLY' | 'DAILY';
  currentActivePartition: string;
  upcomingPartition: string;
  rowCount: string;
  storageSize: string;
  status: 'ACTIVE' | 'PRE-CREATED' | 'ARCHIVED';
  indexState: 'OPTIMAL' | 'REINDEXED';
}

@Component({
  selector: 'app-data-partitioning',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './data-partitioning.component.html',
  styleUrls: ['./data-partitioning.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapDatabaseFill,
      bootstrapCalendarCheckFill,
      bootstrapLightningChargeFill,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapShieldCheck,
      bootstrapCpuFill,
      bootstrapHddStackFill,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapLayersFill,
      bootstrapClockHistory,
      bootstrapDiagram3Fill,
      bootstrapGearFill,
    })
  ]
})
export class DataPartitioningComponent implements AfterViewInit, OnDestroy {
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
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollSpy.setActivePath(null);
  }

  goToAutonomy(): void {
    goToPage(this.isTransitioning(), this.router, '/features/autonomy');
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/autonomy/purge');
  }

}

