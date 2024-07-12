import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
  import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,private tostService :ToastrService) {}

  login(user: { code: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.code, tokens)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()
      ),
      catchError(error => {
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/refresh-tokens`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    let value=localStorage.getItem(this.REFRESH_TOKEN)
    return value;
  }

  private UserInfo() {
    let value=localStorage.getItem(this.loggedUser)
    return value;
  }


  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN, jwt.access.token);
    localStorage.setItem(this.REFRESH_TOKEN, jwt.refresh.token);
  }
 private storeTokens(data: any) {

    localStorage.setItem(this.JWT_TOKEN,data?.tokens.access.token);
    localStorage.setItem(this.REFRESH_TOKEN, data?.tokens.refresh.token);
    localStorage.setItem("userInfo", JSON.stringify(data?.user));

  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
