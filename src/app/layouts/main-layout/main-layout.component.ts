import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, BottomNavComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  user = inject(AuthService).currentUser;
  private theme = inject(ThemeService);
}
