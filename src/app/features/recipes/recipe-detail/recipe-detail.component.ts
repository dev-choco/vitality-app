import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { RecipeDetail } from '../../../core/models';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  recipe = signal<RecipeDetail | null>(null);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getRecipeBySlug(slug).subscribe((r: RecipeDetail | null) => this.recipe.set(r));
  }
}
