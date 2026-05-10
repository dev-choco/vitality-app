import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'alimentos', loadComponent: () => import('./features/foods/food-dictionary/food-dictionary.component').then(m => m.FoodDictionaryComponent) },
      { path: 'alimentos/:slug', loadComponent: () => import('./features/foods/food-detail/food-detail.component').then(m => m.FoodDetailComponent) },
      { path: 'recetas', loadComponent: () => import('./features/recipes/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
      { path: 'recetas/:slug', loadComponent: () => import('./features/recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent) },
      { path: 'arma-tu-plato', loadComponent: () => import('./features/plate-builder/plate-builder.component').then(m => m.PlateBuilderComponent) },
      { path: 'mitos', loadComponent: () => import('./features/myths/myths.component').then(m => m.MythsComponent) },
      { path: 'perfil', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
