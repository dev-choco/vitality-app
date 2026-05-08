import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-banner',
  standalone: true,
  templateUrl: './feedback-banner.component.html',
})
export class FeedbackBannerComponent {
  @Input({ required: true }) title!: string;
  @Input() description = '';
  @Input() variant: 'success' | 'info' | 'error' = 'success';

  get icon(): string {
    switch (this.variant) {
      case 'error': return 'cancel';
      case 'info': return 'info';
      default: return 'check_circle';
    }
  }
}
