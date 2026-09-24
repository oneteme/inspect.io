import { Component, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown, bootstrapArrowRight,
  bootstrapCodeSlash, bootstrapJournalCode,
  bootstrapLayersFill,
  bootstrapTerminal
} from '@ng-icons/bootstrap-icons';

@Component({
  imports: [TranslateModule, NgIcon],
  selector: 'app-compatibilities',
  styleUrls: ['./compatibilities.component.scss'],
  templateUrl: './compatibilities.component.html',
  providers: [
    provideIcons({
      bootstrapArrowDown
    }),
  ],
  standalone: true,
})
export class CompatibilitiesComponent {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);
  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    onNavigateUp: () => this.goToInstallation(),
    onNavigateDown: () => this.goToArchitecture(),
  });

  goToInstallation(): void {
    goToPage(this.isTransitioning(), this.router, '/installation');
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }
}
// java, js, parler de spring des framework
