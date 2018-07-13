import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  public singIn(data: {}): Observable<any> {
    return this.http.post(`auth/local`, data)
      .pipe(
        tap((res) => {
          if (res.token) {
            this.tokenService.setToken(res.token);
          }
        })
      );
  }

  public signUp(data: {}): Observable<any> {
    return this.http.post(`api/users`, data);
  }
}
