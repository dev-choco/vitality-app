import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { RecipeCardComponent } from '../../../shared/components/recipe-card/recipe-card.component';
import { RecipeSummary } from '../../../core/models';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [SearchBarComponent, RecipeCardComponent, RouterLink],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  recipes = signal<RecipeSummary[]>([]);
  activeFilter = signal<string | null>(null);

  constructor() {
    const ingredients = this.route.snapshot.queryParamMap.get('ingredients');
    const goal = this.route.snapshot.queryParamMap.get('goal');

    if (ingredients) {
      this.loadByIngredients(ingredients);
    } else if (goal) {
      this.loadRecipes(goal);
    } else {
      this.loadRecipes();
    }
  }

  loadRecipes(goal?: string, budget?: string) {
    this.activeFilter.set(goal || budget || null);
    this.api.getRecipes(goal, budget, 0, 50).subscribe((r) => {
      this.recipes.set(r.content);
    });
  }

  loadByIngredients(ingredients: string) {
    this.activeFilter.set('ingredients');
    this.api.getRecipesByIngredients(ingredients, 0, 50).subscribe((r) => {
      this.recipes.set(r.content);
    });
  }

  onIngredientSearch(query: string) {
    this.loadByIngredients(query);
  }
}
