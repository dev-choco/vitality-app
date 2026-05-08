import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodSummary, FoodDetail, FoodCategory } from '../models';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private http = inject(HttpClient);

  getAll(search?: string, categoryId?: number): Observable<FoodSummary[]> {
    let params: any = {};
    if (search) params.search = search;
    if (categoryId) params.categoryId = categoryId;
    return this.http.get<FoodSummary[]>('foods', { params });
  }

  getById(id: number): Observable<FoodDetail> {
    return this.http.get<FoodDetail>(`foods/${id}`);
  }

  getBySlug(slug: string): Observable<FoodDetail> {
    return this.http.get<FoodDetail>(`foods/slug/${slug}`);
  }

  getCategories(): Observable<FoodCategory[]> {
    return this.http.get<FoodCategory[]>('foods/categories');
  }
}
