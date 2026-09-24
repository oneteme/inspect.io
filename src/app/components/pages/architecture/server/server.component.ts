import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDown, bootstrapArrowRight, bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import mermaid from 'mermaid';
import { goToPage } from '@utils/utils';

@Component({
  imports: [CommonModule, MarkdownModule, TranslateModule, NgIcon],
  selector: 'app-server',
  styleUrls: ['./server.component.scss'],
  templateUrl: './server.component.html',
  providers: [
    provideIcons({
      bootstrapArrowDown,
      bootstrapArrowRight,
      bootstrapCheckCircleFill,
    }),
  ],
  standalone: true,
})
export class ServerComponent implements AfterViewInit {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);
  readonly isTransitioning = signal(false);

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      void mermaid.run();
    }
  }

  goToNext(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture/application');
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }
}

