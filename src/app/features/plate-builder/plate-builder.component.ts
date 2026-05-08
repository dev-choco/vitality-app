import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FoodService } from '../../core/services/food.service';
import { FeedbackBannerComponent } from '../../shared/components/feedback-banner/feedback-banner.component';
import { FoodSummary } from '../../core/models';

@Component({
  selector: 'app-plate-builder',
  standalone: true,
  imports: [FeedbackBannerComponent],
  templateUrl: './plate-builder.component.html',
})
export class PlateBuilderComponent {
  api: ApiService;
  foodService: FoodService;

  proteins = signal<FoodSummary[]>([]);
  carbs = signal<FoodSummary[]>([]);
  veggies = signal<FoodSummary[]>([]);

  selectedProtein = signal<FoodSummary | null>(null);
  selectedCarb = signal<FoodSummary | null>(null);
  selectedVeggieIds = signal<number[]>([]);
  saving = signal(false);

  feedback = signal<{ active: boolean; title: string; description: string; variant: 'success' | 'info' | 'error' }>(
    { active: false, title: '', description: '', variant: 'success' }
  );

  constructor() {
    this.api = inject(ApiService);
    this.foodService = inject(FoodService);

    this.foodService.getAll(undefined, 1).subscribe((f: FoodSummary[]) => this.proteins.set(f));
    this.foodService.getAll(undefined, 2).subscribe((f: FoodSummary[]) => this.carbs.set(f));
    this.foodService.getAll(undefined, 3).subscribe((f: FoodSummary[]) => this.veggies.set(f));
  }

  get selectedVeggies(): () => string[] {
    const ids = this.selectedVeggieIds();
    return () => this.veggies().filter((v) => ids.includes(v.id)).map((v) => v.name);
  }

  selectProtein(food: FoodSummary) {
    this.selectedProtein.set(food);
    this.checkBalance();
  }

  selectCarb(food: FoodSummary) {
    this.selectedCarb.set(food);
    this.checkBalance();
  }

  toggleVeggie(food: FoodSummary) {
    const current = this.selectedVeggieIds();
    if (current.includes(food.id)) {
      this.selectedVeggieIds.set(current.filter((id) => id !== food.id));
    } else {
      this.selectedVeggieIds.set([...current, food.id]);
    }
    this.checkBalance();
  }

  isVeggieSelected(foodId: number): boolean {
    return this.selectedVeggieIds().includes(foodId);
  }

  private checkBalance() {
    if (this.selectedProtein() && this.selectedCarb() && this.selectedVeggieIds().length >= 2) {
      this.feedback.set({
        active: true,
        title: '¡Plato balanceado!',
        description: 'Has seleccionado una excelente combinación de nutrientes.',
        variant: 'success',
      });
    } else if (this.selectedProtein() || this.selectedCarb() || this.selectedVeggieIds().length) {
      this.feedback.set({
        active: true,
        title: 'Sigue armando tu plato',
        description: 'Selecciona al menos un alimento de cada grupo.',
        variant: 'info',
      });
    } else {
      this.feedback.set({ active: false, title: '', description: '', variant: 'success' });
    }
  }

  savePlate() {
    this.saving.set(true);
    this.api.savePlate({
      proteinFoodId: this.selectedProtein()?.id ?? null,
      carbFoodId: this.selectedCarb()?.id ?? null,
      veggieFoodIds: this.selectedVeggieIds(),
      notes: 'Mi plato balanceado',
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.feedback.set({
          active: true,
          title: '¡Plato guardado!',
          description: 'Tu plato ha sido guardado exitosamente.',
          variant: 'success',
        });
      },
      error: () => {
        this.saving.set(false);
        this.feedback.set({
          active: true,
          title: 'Error',
          description: 'No se pudo guardar el plato.',
          variant: 'error',
        });
      },
    });
  }
}
