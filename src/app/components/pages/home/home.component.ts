import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftStartOnRectangleMicro, heroArrowRightMicro } from '@ng-icons/heroicons/micro';
import { bootstrapRocketTakeoffFill, bootstrapArrowRight, bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { goToPage, isAtBottom } from '@utils/utils';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowLeftStartOnRectangleMicro,
      heroArrowRightMicro,
      bootstrapRocketTakeoffFill,
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
    }),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[class.home-transitioning]': 'isTransitioning()',
  },
  standalone: true,
})
export class HomeComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  isTransitioning = signal(false);
  private touchStartY = 0;

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
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const revealElements = this.el.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element: Element) => observer.observe(element));

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
      });
    }
  }

  goToFeatures(): void {
    goToPage(this.isTransitioning(), this.router, '/features');
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }
}
