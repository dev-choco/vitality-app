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
  selectedGoal = signal<string>('');
  selectedBudget = signal<string>('');
  selectedMealType = signal<string>('');

  constructor() {
    const params = this.route.snapshot.queryParamMap;

    const goal = params.get('goal');
    const budget = params.get('budget');
    const ingredients = params.get('ingredients');

    if (goal) this.selectedGoal.set(goal);
    if (budget) this.selectedBudget.set(budget);

    if (ingredients) {
      this.loadByIngredients(ingredients);
    } else {
      this.loadRecipes();
    }
  }

  filterGoal(goal: string) {
    this.selectedGoal.set(goal);
    this.loadRecipes();
  }

  filterBudget(budget: string) {
    this.selectedBudget.set(budget);
    this.loadRecipes();
  }

  filterMealType(mealType: string) {
    this.selectedMealType.set(mealType);
    this.loadRecipes();
  }

  loadRecipes() {
    this.api.getRecipes(
      this.selectedGoal() || undefined,
      this.selectedBudget() || undefined,
      this.selectedMealType() || undefined,
      0,
      50
    ).subscribe((r) => {
      this.recipes.set(r.content);
    });
  }

  loadByIngredients(ingredients: string) {
    this.api.getRecipesByIngredients(ingredients, 0, 50).subscribe((r) => {
      this.recipes.set(r.content);
    });
  }

  onIngredientSearch(query: string) {
    this.loadByIngredients(query);
  }
}
