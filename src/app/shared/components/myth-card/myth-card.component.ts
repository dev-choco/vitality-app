import { Component, Input } from '@angular/core';
import { MythSummary } from '../../../core/models';

@Component({
  selector: 'app-myth-card',
  standalone: true,
  templateUrl: './myth-card.component.html',
})
export class MythCardComponent {
  @Input({ required: true }) myth!: MythSummary;
}
