import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeSummary, RecipeDetail, MythSummary, MythDetail, Goal, SavedPlate, PageResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getRecipes(goal?: string, budget?: string, page = 0, size = 20): Observable<PageResponse<RecipeSummary>> {
    let params: any = { page, size };
    if (goal) params.goal = goal;
    if (budget) params.budget = budget;
    return this.http.get<PageResponse<RecipeSummary>>('recipes', { params });
  }

  getRecipesByIngredients(ingredients: string, page = 0, size = 20): Observable<PageResponse<RecipeSummary>> {
    return this.http.get<PageResponse<RecipeSummary>>('recipes/by-ingredients', {
      params: { ingredients, page, size },
    });
  }

  getRecipeById(id: number): Observable<RecipeDetail> {
    return this.http.get<RecipeDetail>(`recipes/${id}`);
  }

  getRecipeBySlug(slug: string): Observable<RecipeDetail> {
    return this.http.get<RecipeDetail>(`recipes/slug/${slug}`);
  }

  getMyths(category?: string, page = 0, size = 20): Observable<PageResponse<MythSummary>> {
    let params: any = { page, size };
    if (category) params.category = category;
    return this.http.get<PageResponse<MythSummary>>('myths', { params });
  }

  getMythById(id: number): Observable<MythDetail> {
    return this.http.get<MythDetail>(`myths/${id}`);
  }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>('goals');
  }

  getAllPlates(): Observable<SavedPlate[]> {
    return this.http.get<SavedPlate[]>('plates');
  }

  savePlate(data: { proteinFoodId: number | null; carbFoodId: number | null; veggieFoodIds: number[]; notes: string }): Observable<SavedPlate> {
    return this.http.post<SavedPlate>('plates', data);
  }

  deletePlate(id: number): Observable<void> {
    return this.http.delete<void>(`plates/${id}`);
  }
}
