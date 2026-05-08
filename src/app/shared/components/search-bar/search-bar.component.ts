import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Input() placeholder = 'Tengo huevo, arroz y tomate...';
  @Output() search = new EventEmitter<string>();

  query = '';

  onSearch() {
    if (this.query.trim()) {
      this.search.emit(this.query.trim());
    }
  }
}
