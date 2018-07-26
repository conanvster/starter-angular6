import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  public user = new BehaviorSubject<User>(null);
  public isGuest = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private injector: Injector) {
    this.user.subscribe((user: User) => {
      this.isGuest.next(!Boolean(user));
    });
  }

  public getUser(): Observable<User> {
    if (!this.tokenService.getToken()) {
      return of();
    }
    return this.http.get('api/users/me')
      .pipe(tap((user: User) => {
        this.user.next(user);
      }, () => {
        this.user.next(null);
        this.tokenService.removeToken();
      }));
  }

  public logOut(): void {
    this.user.next(null);
    this.tokenService.removeToken();
    this.router().navigate(['/sign-in']);
  }

  public getUserForLoad(): Promise<any> {
    return new Promise((resolve) => {
      this.getUser().pipe(finalize(() => {
        resolve();
      })).subscribe();
    });
  }

  public changePassword(data: {}): Observable<any> {
    return this.http.put(`api/users/${this.user.getValue()._id}/password`, data);
  }

  private router(): Router {
    return this.injector.get(Router);
  }
}
