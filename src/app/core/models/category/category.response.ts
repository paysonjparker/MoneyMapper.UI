import { ExpenseResponse } from "../transaction/expense/expense.response";
import { IncomeResponse } from "../transaction/income/income.response";

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
