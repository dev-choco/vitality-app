import { Component, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  showMenu = false;

  readonly navItems: NavItem[] = [
    { icon: 'home', label: 'Inicio', route: '/' },
    { icon: 'menu_book', label: 'Diccionario', route: '/alimentos' },
    { icon: 'restaurant', label: 'Recetas', route: '/recetas' },
    { icon: 'restaurant_menu', label: 'Plato', route: '/arma-tu-plato' },
    { icon: 'fact_check', label: 'Mitos', route: '/mitos' },
  ];

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.showMenu) return;
    const target = event.target as HTMLElement;
    if (!this.el.nativeElement.contains(target)) {
      this.showMenu = false;
    }
  };

  ngOnInit() {
    document.addEventListener('click', this.onDocumentClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  logout() {
    this.showMenu = false;
    this.auth.logout();
  }
}
