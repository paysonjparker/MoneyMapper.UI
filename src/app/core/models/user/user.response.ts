import { BudgetResponse } from "../budget/budget.response";

export interface UserResponse {
    id: number,
    username: string,
    password: string,
    fullName: string,
    emailAddress: string,
    budgets?: BudgetResponse[]
}
