import { ExpenseResponse } from "../expense/expense.response";
import { IncomeResponse } from "../income/income.response";

export interface CategoryResponse {
    id: number,
    description: string,
    planned: number,
    remaining: number,
    spent: number,
    expenses?: ExpenseResponse[],
    incomes?: IncomeResponse[],
    budgetId: number,
}
