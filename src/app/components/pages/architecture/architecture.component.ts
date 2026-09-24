import { AfterViewInit, Component, ElementRef, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import mermaid from 'mermaid';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDown } from '@ng-icons/bootstrap-icons';
import { ScrollspyService } from '@services/scrollspy.service';

@Component({
  selector: 'app-architecture',
  imports: [TranslateModule, MarkdownModule, NgIcon],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
  providers: [
    provideIcons({
      bootstrapArrowDown,
    }),
  ],
  standalone: true,
})
export class ArchitectureComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly scrollSpy = inject(ScrollspyService);
  protected readonly translate = inject(TranslateService);
  private observer?: IntersectionObserver;
  readonly isTransitioning = signal(false);


  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      void mermaid.run();
    }
  }

  goToCompatibilities(): void {
    goToPage(this.isTransitioning(), this.router, '/compatibilities');
  }

  goToComponents(): void {
    goToPage(this.isTransitioning(), this.router, '/components');
  }
}
