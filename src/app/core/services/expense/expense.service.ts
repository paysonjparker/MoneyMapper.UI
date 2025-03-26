import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { ExpenseResponse } from '../../models/transaction/expense/expense.response';
import { AddExpenseRequest } from '../../models/transaction/expense/add-expense.request';
import { UpdateExpenseRequest } from '../../models/transaction/expense/update-expense.request';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;

  constructor(private http: HttpClient) { }

  public getExpenseByid(expenseId: number): Observable<ExpenseResponse> {
    const url = `${this.moneyMapperApiUrl}/expenses/${expenseId}`
    return this.http.get<ExpenseResponse>(url);
  }

  public deleteExpense(expenseId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.moneyMapperApiUrl + "/expenses/" + expenseId);
  }

  public updateExpense(expenseId: number, updateExpenseRequest: UpdateExpenseRequest): Observable<ExpenseResponse> {
    return this.http.put<ExpenseResponse>(this.moneyMapperApiUrl + "/expenses/" + expenseId, updateExpenseRequest);
  }

  public createExpense(addExpenseRequest: AddExpenseRequest): Observable<ExpenseResponse> {
    return this.http.post<ExpenseResponse>(this.moneyMapperApiUrl + "/expenses", addExpenseRequest);
  }

  public getAllExpensesByCategoryId(categoryId: number): Observable<ExpenseResponse[]> {
    const url = `${this.moneyMapperApiUrl}/expenses/category/${categoryId}`;
    return this.http.get<ExpenseResponse[]>(url);
  }
}
