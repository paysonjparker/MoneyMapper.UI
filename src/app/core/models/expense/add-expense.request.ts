export interface AddExpenseRequest {
    total: number,
    date: Date,
    description: string,
    categoryId: number,
}
