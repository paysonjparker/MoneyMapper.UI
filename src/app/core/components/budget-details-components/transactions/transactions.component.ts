import { Component, Input } from '@angular/core';
import { BudgetResponse } from '../../../models/budget/budget.response';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

  @Input() budgets!: BudgetResponse[];

}
