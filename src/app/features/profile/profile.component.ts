import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';
import { SavedPlate } from '../../core/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  api = inject(ApiService);
  theme = inject(ThemeService);

  user = this.auth.currentUser;
  activeTab: 'info' | 'plates' | 'preferences' = 'info';
  plates = signal<SavedPlate[]>([]);

  readonly themeModes: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'system', label: 'Configuración del sistema', icon: 'brightness_auto' },
    { value: 'light', label: 'Claro', icon: 'light_mode' },
    { value: 'dark', label: 'Oscuro', icon: 'dark_mode' },
  ];

  ngOnInit() {
    this.loadPlates();
  }

  loadPlates() {
    this.api.getAllPlates().subscribe({
      next: (p) => this.plates.set(p),
      error: () => this.plates.set([]),
    });
  }
}
