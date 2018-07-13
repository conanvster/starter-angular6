import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private userService: UserService,
              private router: Router) {
  }

  public singIn(data: {}): Observable<any> {
    return this.http.post(`auth/local`, data)
      .pipe(
        tap((res) => {
          if (res.token) {
            this.tokenService.setToken(res.token);
            this.userService.getUser()
              .subscribe(() => {
                this.router.navigate(['/']);
              });
          }
        })
      );
  }

  public signUp(data: {}): Observable<any> {
    return this.http.post(`api/users`, data);
  }
}
