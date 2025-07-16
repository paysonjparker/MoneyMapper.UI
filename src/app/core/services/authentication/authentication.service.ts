import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../models/authentication/login.request';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/authentication/login.response';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly moneyMapperApiUrl = environment.moneyMapperLocalApi;

  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedInObservable = this.userLoggedIn.asObservable();

  constructor(private http: HttpClient) { }

  public login(userLoginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.moneyMapperApiUrl + "/users/authenticate", userLoginRequest)
      .pipe(tap(result => this.setSession(result)));
  }

  private setSession(authResult: any) {
    localStorage?.setItem('AuthToken', authResult.token);
    localStorage?.setItem('FullName', authResult.fullName);
    localStorage?.setItem('Username', authResult.username);
    localStorage?.setItem('UserId', authResult.id);
  }

  logout() {
    localStorage?.removeItem('AuthToken');
    localStorage?.removeItem('FullName');
    localStorage?.removeItem('Username');
    localStorage?.removeItem('UserId');
  }

  isLoggedIn() {
    const isLoggedIn = this.getAuthToken() !== null;
    return isLoggedIn;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getAuthToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage?.getItem('AuthToken');
    }
    return null;
  }

  getUserId() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage?.getItem('UserId');
    }
    return null;
  }

  changeLoggedInStatus(value: boolean) {
    this.userLoggedIn.next(value);
  }

}
