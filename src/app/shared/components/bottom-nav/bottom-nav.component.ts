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
    { icon: 'home', label: 'Inicio', route: '/' },
    { icon: 'menu_book', label: 'Diccionario', route: '/alimentos' },
    { icon: 'restaurant', label: 'Recetas', route: '/recetas' },
    { icon: 'restaurant_menu', label: 'Plato', route: '/arma-tu-plato' },
    { icon: 'fact_check', label: 'Mitos', route: '/mitos' },
  ];
}
