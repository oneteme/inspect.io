import {
  Component,
  signal,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  inject,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapHddStackFill,
  bootstrapGit,
  bootstrapLayersFill,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSliders2,
  bootstrapCpuFill,
  bootstrapShieldCheck,
  bootstrapClockHistory,
  bootstrapGlobe,
  bootstrapTagFill,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { ScrollspyService } from '@services/scrollspy.service';
import { goToPage } from '@utils/utils';


@Component({
  selector: 'app-application-inventory',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './application-inventory.component.html',
  styleUrls: ['./application-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapHddStackFill,
      bootstrapGit,
      bootstrapLayersFill,
      bootstrapCheckCircleFill,
      bootstrapArrowDown,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSliders2,
      bootstrapCpuFill,
      bootstrapShieldCheck,
      bootstrapClockHistory,
      bootstrapGlobe,
      bootstrapTagFill,
    })
  ]
})
export class ApplicationInventoryComponent implements AfterViewInit, OnDestroy {
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

      // Automatically activate and expand the section upon entering
      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/health')) {
        this.scrollSpy.setActivePath('/features/health/inventory');
      }
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

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/health/events');
  }

}
