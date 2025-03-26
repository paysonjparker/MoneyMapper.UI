export interface TransactionResponse {
    id: number,
    total: number,
    date: Date,
    description: string,
    categoryId: number,
    transactionType: string,
}