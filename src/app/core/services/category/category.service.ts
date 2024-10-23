import { Injectable } from '@angular/core';
import { CategoryResponse } from '../../models/category/category.response';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../../models/category/add-category.request';
import { UpdateCategoryRequest } from '../../models/category/update-category.request';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;

  constructor(private http: HttpClient) { }

  public getCategoryByid(categoryId: number): Observable<CategoryResponse> {
    const url = `${this.moneyMapperApiUrl}/categories/${categoryId}`
    return this.http.get<CategoryResponse>(url);
  }

  public deleteCategory(categoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.moneyMapperApiUrl + "/categories/" + categoryId);
  }

  public updateCategory(categoryId: number, updateCategoryRequest: UpdateCategoryRequest): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(this.moneyMapperApiUrl + "/categories/" + categoryId, updateCategoryRequest);
  }

  public createCategory(addCategoryRequest: AddCategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.moneyMapperApiUrl + "/categories", addCategoryRequest);
  }

  public getAllCategoriesByBudgetId(budgetId: number): Observable<CategoryResponse[]> {
    const url = `${this.moneyMapperApiUrl}/categories/budget/${budgetId}`;
    return this.http.get<CategoryResponse[]>(url);
  }
}
