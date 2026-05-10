import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FoodService } from '../../../core/services/food.service';
import { FoodDetail } from '../../../core/models';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './food-detail.component.html',
})
export class FoodDetailComponent {
  private route = inject(ActivatedRoute);
  private foodService = inject(FoodService);

  food = signal<FoodDetail | null>(null);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.foodService.getBySlug(slug).subscribe((f: FoodDetail | null) => this.food.set(f));
  }
}
