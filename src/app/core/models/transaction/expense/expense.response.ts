export interface ExpenseResponse {
    id: number,
    total: number,
    date: Date,
    description: string,
    categoryId: number,
    transactionType: string,
}
