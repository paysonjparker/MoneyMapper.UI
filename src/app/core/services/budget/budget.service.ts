import { Injectable } from '@angular/core';
import { BudgetResponse } from '../../models/budget/budget.response';
import { Observable } from 'rxjs';
import { AddBudgetRequest } from '../../models/budget/add-budget.request';
import { UpdateBudgetRequest } from '../../models/budget/update-budget.request';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;

  constructor(private http: HttpClient) { }

  public getBudgetByid(categroyId: number): Observable<BudgetResponse> {
    const url = `${this.moneyMapperApiUrl}/budgets/${categroyId}`
    return this.http.get<BudgetResponse>(url);
  }

  public deleteBudget(categroyId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.moneyMapperApiUrl + "/budgets/" + categroyId);
  }

  public updateBudget(categroyId: number, updateBudgetRequest: UpdateBudgetRequest): Observable<BudgetResponse> {
    return this.http.put<BudgetResponse>(this.moneyMapperApiUrl + "/budgets/" + categroyId, updateBudgetRequest);
  }

  public createBudget(addBudgetRequest: AddBudgetRequest): Observable<BudgetResponse> {
    return this.http.post<BudgetResponse>(this.moneyMapperApiUrl + "/budgets", addBudgetRequest);
  }

  public getAllBudgetsByUserId(userId: number): Observable<BudgetResponse[]> {
    const url = `${this.moneyMapperApiUrl}/budgets/user/${userId}`;
    return this.http.get<BudgetResponse[]>(url);
  }
}
