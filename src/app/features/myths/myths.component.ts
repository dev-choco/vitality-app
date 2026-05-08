import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { MythCardComponent } from '../../shared/components/myth-card/myth-card.component';
import { MythSummary } from '../../core/models';

@Component({
  selector: 'app-myths',
  standalone: true,
  imports: [MythCardComponent],
  templateUrl: './myths.component.html',
})
export class MythsComponent {
  api = inject(ApiService);

  myths = signal<MythSummary[]>([]);
  activeCategory = signal('');

  constructor() {
    this.loadMyths();
  }

  filter(category: string) {
    this.activeCategory.set(category);
    this.loadMyths(category);
  }

  private loadMyths(category?: string) {
    this.api.getMyths(category || undefined, 0, 50).subscribe((r: { content: MythSummary[] }) => {
      this.myths.set(r.content);
    });
  }
}
