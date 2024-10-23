import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { UserResponse } from '../../models/user/user.response';
import { AddUserRequest } from '../../models/user/add-user.request';
import { UpdateUserRequest } from '../../models/user/update-user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;

  constructor(private http: HttpClient) { }

  public getUserById(userId: number): Observable<UserResponse> {
    const url = `${this.moneyMapperApiUrl}/users/${userId}`
    return this.http.get<UserResponse>(url);
  }

  public deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.moneyMapperApiUrl + "/users/" + userId);
  }

  public updateUser(userId: number, updateUserRequest: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.moneyMapperApiUrl + "/users/" + userId, updateUserRequest);
  }

  public createUser(addUserRequest: AddUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.moneyMapperApiUrl + "/users", addUserRequest);
  }

  public getAllUsers(): Observable<UserResponse[]> {
    const url = `${this.moneyMapperApiUrl}/users`;
    return this.http.get<UserResponse[]>(url);
  }
}
