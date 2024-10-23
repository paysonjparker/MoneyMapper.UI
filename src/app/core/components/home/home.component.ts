import { Component } from '@angular/core';
import { BudgetComponent } from '../budget-components/budget/budget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BudgetComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
