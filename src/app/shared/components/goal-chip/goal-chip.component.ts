import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Goal } from '../../../core/models';

@Component({
  selector: 'app-goal-chip',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './goal-chip.component.html',
})
export class GoalChipComponent {
  @Input({ required: true }) goal!: Goal;
}
