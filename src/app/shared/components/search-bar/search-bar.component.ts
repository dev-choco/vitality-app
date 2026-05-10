import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnDestroy {
  @Input() placeholder = 'Tengo huevo, arroz y tomate...';
  @Output() search = new EventEmitter<string>();

  query = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        filter((q) => q.trim().length >= 3),
        takeUntil(this.destroy$)
      )
      .subscribe((q) => this.search.emit(q.trim()));
  }

  onInput() {
    if (this.query.trim().length >= 3) {
      this.searchSubject.next(this.query);
    }
  }

  onManualSearch() {
    if (this.query.trim()) {
      this.search.emit(this.query.trim());
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
