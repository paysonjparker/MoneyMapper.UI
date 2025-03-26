import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IncomeResponse } from '../../models/transaction/income/income.response';
import { Observable } from 'rxjs';
import { UpdateIncomeRequest } from '../../models/transaction/income/update-income.request';
import { AddIncomeRequest } from '../../models/transaction/income/add-income.request';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;

  constructor(private http: HttpClient) { }

  public getIncomeById(incomeId: number): Observable<IncomeResponse> {
    const url = `${this.moneyMapperApiUrl}/incomes/${incomeId}`
    return this.http.get<IncomeResponse>(url);
  }

  public deleteIncome(incomeId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.moneyMapperApiUrl + "/incomes/" + incomeId);
  }

  public updateIncome(incomeId: number, updateIncomeRequest: UpdateIncomeRequest): Observable<IncomeResponse> {
    return this.http.put<IncomeResponse>(this.moneyMapperApiUrl + "/incomes/" + incomeId, updateIncomeRequest);
  }

  public createIncome(addIncomeRequest: AddIncomeRequest): Observable<IncomeResponse> {
    return this.http.post<IncomeResponse>(this.moneyMapperApiUrl + "/incomes", addIncomeRequest);
  }

  public getAllIncomesByCategoryId(categoryId: number): Observable<IncomeResponse[]> {
    const url = `${this.moneyMapperApiUrl}/incomes/category/${categoryId}`;
    return this.http.get<IncomeResponse[]>(url);
  }
}
