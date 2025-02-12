import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget/budget.service';
import { BudgetResponse } from '../../../models/budget/budget.response';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryResponse } from '../../../models/category/category.response';
import { ExpenseService } from '../../../services/expense/expense.service';
import { IncomeService } from '../../../services/income/income.service';
import exp from 'constants';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {

  budgets: BudgetResponse[] = [];

  constructor(private budgetService: BudgetService,
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.getAllBudgets();
    }
  }

  getAllBudgets() {
    this.budgetService.getAllBudgetsByUserId(Number(this.authenticationService.getUserId())).subscribe({
      next: data => {
        this.budgets = data;
        this.getAllCategories();
      },
      error: (error) => {
        console.error(error);
      },
    });

  }

  getAllCategories() {
    this.budgets.forEach(budget => {
      this.categoryService.getAllCategoriesByBudgetId(budget.id).subscribe({
        next: data => {
          budget.categories = data;
          this.getAllExpenses();
          this.getAllIncomes();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  getAllExpenses() {
    this.budgets.forEach(budget => {
      budget.categories?.forEach(category => {
        this.expenseService.getAllExpensesByCategoryId(category.id).subscribe({
          next: data => {
            category.expenses = data;
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
    });
  }

  getAllIncomes() {
    this.budgets.forEach(budget => {
      budget.categories?.forEach(category => {
        this.incomeService.getAllIncomesByCategoryId(category.id).subscribe({
          next: data => {
            category.incomes = data;
            this.calculateCategoryValues();
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
    });
  }

  calculateCategoryValues() {
    this.budgets.forEach(budget => {
      budget.categories?.forEach(category => {
        let totalExpense = 0;
        let totalIncome = 0;
        category.expenses?.forEach(expense => {
          totalExpense += expense.total;
        });
        category.incomes?.forEach(income => {
          totalIncome += income.total;
        });
        category.spent = (totalExpense - totalIncome);
        category.remaining = (category.planned - category.spent);
      });
    });
  }

}
