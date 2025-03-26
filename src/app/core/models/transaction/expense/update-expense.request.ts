export interface UpdateExpenseRequest {
    total: number,
    date: Date,
    description: string,
    categoryId: number,
}
