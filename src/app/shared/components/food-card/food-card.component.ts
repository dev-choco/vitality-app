import { Component, Input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FoodSummary } from '../../../core/models';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [RouterLink, LowerCasePipe],
  templateUrl: './food-card.component.html',
})
export class FoodCardComponent {
  @Input({ required: true }) food!: FoodSummary;
}
