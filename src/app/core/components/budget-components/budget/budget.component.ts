import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget/budget.service';
import { BudgetResponse } from '../../../models/budget/budget.response';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { ExpenseService } from '../../../services/expense/expense.service';
import { IncomeService } from '../../../services/income/income.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AddCategoryRequest } from '../../../models/category/add-category.request';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryResponse } from '../../../models/category/category.response';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ConfirmPopupModule,
    ToastModule
  ],
  providers: [
    ConfirmationService, MessageService
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {

  budgets: BudgetResponse[] = [];

  createCategoryDialogVisible: boolean = false;

  createCategoryForm!: FormGroup;


  constructor(
    private budgetService: BudgetService,
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.getAllBudgets();
    }

    this.createCategoryForm = this.createAddCategoryForm();
  }

  createAddCategoryForm(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      planned: new FormControl<number>(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
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

  showCreateCategoryDialog() {
    this.createCategoryDialogVisible = true;
  }

  validateRequiredFields(formControlName: any) {
    if (this.createCategoryForm.controls[formControlName].invalid && (this.createCategoryForm.controls[formControlName].dirty || this.createCategoryForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  addCategory(budgetId: number) {
    const addCategoryRequest: AddCategoryRequest = {
      budgetId: budgetId,
      description: this.createCategoryForm.get('description')?.value,
      planned: this.createCategoryForm.get('planned')?.value,
    };

    this.categoryService.createCategory(addCategoryRequest).subscribe({
      next: data => {
        console.info(data);
        this.createCategoryDialogVisible = false
        this.getAllCategories();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  confirmDeleteCategory(event: Event, category: CategoryResponse) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to delete ${category.description} ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: data => {
            console.info(data);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `You have deleted category: ${category.description}`, key: 'br', life: 3000 });
            this.getAllCategories();
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      reject: () => {

      }
    });
  }

}
