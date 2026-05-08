import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../core/services/food.service';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { FoodCardComponent } from '../../../shared/components/food-card/food-card.component';
import { CategoryChipComponent } from '../../../shared/components/category-chip/category-chip.component';
import { FoodSummary, FoodCategory } from '../../../core/models';

@Component({
  selector: 'app-food-dictionary',
  standalone: true,
  imports: [SearchBarComponent, FoodCardComponent, CategoryChipComponent, RouterLink],
  templateUrl: './food-dictionary.component.html',
})
export class FoodDictionaryComponent {
  foodService = inject(FoodService);
  router = inject(Router);

  foods = signal<FoodSummary[]>([]);
  categories = signal<FoodCategory[]>([]);
  selectedCategory = signal<number | ''>('');
  searchQuery = signal('');

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.foodService.getAll().subscribe((f: FoodSummary[]) => this.foods.set(f));
    this.foodService.getCategories().subscribe((c: FoodCategory[]) => this.categories.set(c));
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    if (query) {
      this.foodService.getAll(query).subscribe((f: FoodSummary[]) => this.foods.set(f));
    } else {
      this.loadData();
    }
  }

  onCategoryFilter(categoryId: string | number) {
    if (!categoryId) {
      this.selectedCategory.set('');
      this.loadData();
    } else {
      this.selectedCategory.set(categoryId as number);
      this.foodService.getAll(undefined, categoryId as number).subscribe((f: FoodSummary[]) => this.foods.set(f));
    }
  }
}
