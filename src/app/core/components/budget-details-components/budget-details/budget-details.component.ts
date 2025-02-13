import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BudgetSummaryComponent } from "../budget-summary/budget-summary.component";
import { TransactionsComponent } from "../transactions/transactions.component";

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [
    TabViewModule,
    BudgetSummaryComponent,
    TransactionsComponent
  ],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.scss'
})
export class BudgetDetailsComponent {

}
