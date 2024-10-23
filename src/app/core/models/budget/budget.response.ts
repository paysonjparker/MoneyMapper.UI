import { CategoryResponse } from "../category/category.response";

export interface BudgetResponse {
    id: number,
    description: string,
    categories?: CategoryResponse[],
    userId: number,
}
