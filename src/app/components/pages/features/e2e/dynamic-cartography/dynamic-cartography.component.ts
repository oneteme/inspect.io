import {
  Component,
  signal,
  ChangeDetectionStrategy,
  AfterViewInit,
  inject,
  ElementRef,
  DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapDiagram3Fill,
  bootstrapHddNetworkFill,
  bootstrapDatabaseFill,
  bootstrapGlobe2,
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapArrowRight,
  bootstrapRocketTakeoffFill,
  bootstrapSpeedometer2,
  bootstrapCloudCheckFill,
  bootstrapCpuFill,
  bootstrapActivity
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { goToPage } from '@utils/utils';
import { ScrollspyService } from '@services/scrollspy.service';


@Component({
  selector: 'app-dynamic-cartography',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIconComponent],
  templateUrl: './dynamic-cartography.component.html',
  styleUrls: ['./dynamic-cartography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapDiagram3Fill,
      bootstrapHddNetworkFill,
      bootstrapDatabaseFill,
      bootstrapGlobe2,
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapArrowRight,
      bootstrapRocketTakeoffFill,
      bootstrapSpeedometer2,
      bootstrapCloudCheckFill,
      bootstrapCpuFill,
      bootstrapActivity
    })
  ]
})
export class DynamicCartographyComponent implements AfterViewInit {
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
        { selector: '#dynamic-cartography-hero', path: '/features/e2e/architecture' },
        { selector: '#dynamic-cartography-pillars', path: '/features/e2e/architecture' },
        { selector: '#dynamic-cartography-deepdive', path: '/features/e2e/architecture' },
        { selector: '#dynamic-cartography-comparison', path: '/features/e2e/architecture' },
      ];

      if (!this.scrollSpy.activePath() || this.scrollSpy.activePath()?.startsWith('/features/e2e')) {
        this.scrollSpy.setActivePath('/features/e2e/architecture');
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
  constructor(private router: Router) {}


  goToInstallation(): void {
    this.router.navigate(['/guide/installation']);
  }

  goToCartography(): void {
    goToPage(this.isTransitioning(), this.router, '/features/e2e');
  }


  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/features/metrics');
  }
}
