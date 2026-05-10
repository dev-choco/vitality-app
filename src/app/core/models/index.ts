export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
}

export interface UserInfo {
  email: string;
  name: string;
  avatarUrl: string;
}

export interface FoodSummary {
  id: number;
  name: string;
  slug: string;
  categoryName: string;
  categoryIcon: string;
  imageUrl: string;
  primaryBenefit: string;
  consumptionSuggestion: string;
}

export interface FoodDetail {
  id: number;
  name: string;
  slug: string;
  category: FoodCategory;
  description: string;
  imageUrl: string;
  caloriesPer100g: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  benefits: BenefitItem[];
  consumptionTips: string;
}

export interface BenefitItem {
  icon: string;
  text: string;
}

export interface FoodCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface RecipeSummary {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  prepTimeMin: number;
  budgetTag: string;
  calories: number;
  goalTag: string;
  ingredientNames: string[];
}

export interface RecipeDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  prepTimeMin: number;
  difficulty: string;
  budgetTag: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  goalTags: string;
  instructions: string;
  ingredients: IngredientItem[];
  createdAt: string;
}

export interface IngredientItem {
  foodId: number;
  foodName: string;
  foodSlug: string;
  quantity: string;
  unit: string;
}

export interface MythSummary {
  id: number;
  mythText: string;
  realityText: string;
  category: string;
}

export interface MythDetail {
  id: number;
  mythText: string;
  realityText: string;
  mythExplanation: string;
  realityExplanation: string;
  category: string;
  imageUrl: string;
  scientificSource: string;
  createdAt: string;
}

export interface Goal {
  slug: string;
  name: string;
  icon: string;
  description: string;
  colorClass: string;
}

export interface SavedPlate {
  id: number;
  protein: PlatedFood | null;
  carb: PlatedFood | null;
  veggieNames: string;
  notes: string;
  createdAt: string;
}

export interface PlatedFood {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
