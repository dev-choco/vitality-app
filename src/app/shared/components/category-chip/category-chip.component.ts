import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-chip',
  standalone: true,
  templateUrl: './category-chip.component.html',
})
export class CategoryChipComponent {
  @Input({ required: true }) label!: string;
  @Input() active = false;
  @Output() select = new EventEmitter<string>();
}
