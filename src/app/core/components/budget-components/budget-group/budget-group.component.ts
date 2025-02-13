import { Component, Input, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../models/category/category.response';
import { ExpenseResponse } from '../../../models/expense/expense.response';
import { IncomeResponse } from '../../../models/income/income.response';
import { PanelModule } from 'primeng/panel';
import { CategoryService } from '../../../services/category/category.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

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

  @Input() budgetGroupExpenses!: ExpenseResponse;

  @Input() budgetGroupIncomes!: IncomeResponse;

  /**
   * Budget group expenses and incomes.
   */
  allBudgetGroupTransactions: any[] = [];

  menuOptions: { label?: string; icon?: string; separator?: boolean }[] = [];

  /**
   *
   */
  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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


}
