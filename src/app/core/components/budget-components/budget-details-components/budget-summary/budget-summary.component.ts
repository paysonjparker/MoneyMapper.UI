import { Component, Input } from '@angular/core';
import { BudgetResponse } from '../../../models/budget/budget.response';

@Component({
  selector: 'app-budget-summary',
  standalone: true,
  imports: [

  ],
  templateUrl: './budget-summary.component.html',
  styleUrl: './budget-summary.component.scss'
})
export class BudgetSummaryComponent {

  @Input() budgets!: BudgetResponse[];
}
