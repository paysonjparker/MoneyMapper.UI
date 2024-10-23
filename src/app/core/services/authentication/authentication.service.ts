import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { UserResponse } from '../../models/user/user.response';
import { AddUserRequest } from '../../models/user/add-user.request';
import { LoginRequest } from '../../models/authentication/login.request';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/authentication/login.response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly moneyMapperApiUrl = environments.moneyMapperLocalApi;
  // private userSubject: BehaviorSubject<UserResponse>;
  // public user: Observable<UserResponse>

  // constructor(private http: HttpClient) {
  //   this.userSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('user') || '{}'));
  //   this.user = this.userSubject.asObservable();
  // }

  // public register(addUserRequest: AddUserRequest): Observable<UserResponse> {
  //   return this.http.post<UserResponse>(this.moneyMapperApiUrl + "/users", addUserRequest)
  //     .pipe(map(user => {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //     }));
  // }

  // public login(userLoginRequest: LoginRequest) {
  //   return this.http.post<LoginResponse>(this.moneyMapperApiUrl + "/users/authenticate", userLoginRequest);
  // }

  // public logout() {

  // }

  // public authenticate() {

  // }

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.moneyMapperApiUrl} + /users/authenticate`, loginRequest)
    // this is just the HTTP call, 
    // we still need to handle the reception of the token
  }
}
