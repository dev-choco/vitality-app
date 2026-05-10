import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { GoalChipComponent } from '../../shared/components/goal-chip/goal-chip.component';
import { MythCardComponent } from '../../shared/components/myth-card/myth-card.component';
import { RecipeSummary, Goal, MythSummary } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchBarComponent, RecipeCardComponent, GoalChipComponent, MythCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  api = inject(ApiService);
  router = inject(Router);

  goals = signal<Goal[]>([]);
  quickRecipes = signal<RecipeSummary[]>([]);
  budgetRecipes = signal<RecipeSummary[]>([]);
  featuredMyth = signal<MythSummary | null>(null);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.api.getGoals().subscribe((g) => this.goals.set(g));

    this.api.getRecipes('energia-diaria', undefined, undefined, 0, 4).subscribe((r) => {
      this.quickRecipes.set(r.content);
    });

    this.api.getRecipes(undefined, 'bajo', undefined, 0, 4).subscribe((r) => {
      this.budgetRecipes.set(r.content);
    });

    this.api.getMyths(undefined, 0, 1).subscribe((r) => {
      if (r.content.length) this.featuredMyth.set(r.content[0]);
    });
  }

  onIngredientSearch(query: string) {
    this.router.navigate(['/recetas'], { queryParams: { ingredients: query } });
  }
}
