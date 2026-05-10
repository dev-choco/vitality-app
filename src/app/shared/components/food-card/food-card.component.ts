import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FoodSummary } from '../../../core/models';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './food-card.component.html',
})
export class FoodCardComponent {
  @Input({ required: true }) food!: FoodSummary;
}
