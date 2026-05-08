import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeSummary } from '../../../core/models';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: RecipeSummary;
  @Input() variant: 'compact' | 'horizontal' | 'full' = 'full';
}
