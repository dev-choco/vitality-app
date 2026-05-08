import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  readonly items: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'menu_book', label: 'Dictionary', route: '/alimentos' },
    { icon: 'restaurant', label: 'Recipes', route: '/recetas' },
    { icon: 'restaurant_menu', label: 'Plate', route: '/arma-tu-plato' },
    { icon: 'fact_check', label: 'Myths', route: '/mitos' },
  ];
}
