import { Component, Input, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../models/category/category.response';
import { ExpenseResponse } from '../../../models/transaction/expense/expense.response';
import { IncomeResponse } from '../../../models/transaction/income/income.response';
import { PanelModule } from 'primeng/panel';
import { CategoryService } from '../../../services/category/category.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TransactionResponse } from '../../../models/transaction/transaction.response';
import { TransactionsComponent } from "../../budget-details-components/transactions/transactions.component";
import { DialogModule } from 'primeng/dialog';
import { CreateTransactionComponent } from "../../transaction-components/create-transaction/create-transaction.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-budget-group',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    MenuModule,
    ConfirmPopupModule,
    CardModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    RadioButtonModule
  ],
  providers: [
    ConfirmationService, MessageService
  ],
  templateUrl: './budget-group.component.html',
  styleUrl: './budget-group.component.scss'
})
export class BudgetGroupComponent implements OnInit {

  @Input() budgetCategoryId!: number;

  @Input() budgetGroupCategory!: CategoryResponse;

  @Input() budgetGroupExpenses!: ExpenseResponse[];

  @Input() budgetGroupIncomes!: IncomeResponse[];

  /**
   * Budget group expenses and incomes.
   */
  allBudgetGroupTransactions: TransactionResponse[] = [];

  menuOptions: { label?: string; icon?: string; separator?: boolean }[] = [];

  createTransactionDialogVisible: boolean = false;

  createTransactionAdminForm!: FormGroup;

  transactionTypes: any[] = [
    { name: 'Income', value: 'income' },
    { name: 'Expense', value: 'expense' },
  ];

  /**
   *
   */
  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.menuOptions = [
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ];
    // this.getCategoryById();
    this.getAllTransactions();

    this.createTransactionAdminForm = this.createTransactionForm()
  }

  getCategoryById() {
    this.categoryService.getCategoryByid(this.budgetCategoryId).subscribe({
      next: data => {
        this.budgetGroupCategory = data;
        // this.getAllCategories();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getAllTransactions() {
    this.budgetGroupExpenses = this.budgetGroupCategory.expenses ?? [];
    this.budgetGroupIncomes = this.budgetGroupCategory.incomes ?? [];
    this.allBudgetGroupTransactions = [
      ...this.budgetGroupExpenses.map(expense => ({ ...expense, transactionType: 'expense' })),
      ...this.budgetGroupIncomes.map(expense => ({ ...expense, transactionType: 'income' }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.info(this.budgetGroupExpenses);
    console.info(this.budgetGroupIncomes);
    console.info(this.allBudgetGroupTransactions);

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
            location.reload();
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

  showCreateTransaction() {
    this.createTransactionDialogVisible = true;
  }

  createTransactionForm() {
    return this.formBuilder.group({
      description: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      total: new FormControl<number>(0, {
        validators: [Validators.required],
      }),
      date: new FormControl<Date>(new Date(), {
        validators: [Validators.required],
      }),
      transactionType: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    });
  }

  createTransaction() {

  }


}
