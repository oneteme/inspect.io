import { Component, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapCodeSlash,
  bootstrapLayersFill,
  bootstrapTerminal,
  bootstrapArrowRight,
  bootstrapJournalCode,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
  host: {
    '[class.installation-transitioning]': 'isTransitioning()',
  },
  imports: [TranslateModule, MarkdownModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapCodeSlash,
      bootstrapLayersFill,
      bootstrapTerminal,
      bootstrapArrowRight,
      bootstrapJournalCode,
    }),
  ],
  standalone: true,
})
export class InstallationComponent  {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    onNavigateUp: () => this.goToFeatures(),
    onNavigateDown: () => this.goToCompatibilities(),
  });



  goToFeatures(): void {
    goToPage(this.isTransitioning(), this.router, '/features');
  }

  goToCompatibilities(): void {
    goToPage(this.isTransitioning(), this.router, '/compatibilities');
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }
}
