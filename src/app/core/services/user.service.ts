import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  public user = new BehaviorSubject<User>(null);

  public getUser(): Observable<User> {
    if (!this.tokenService.getToken()) {
      return of();
    }
    return this.http.get('api/users/me')
      .pipe(tap((user: User) => {
        this.user.next(user);
      }, () => {
        this.user.next(null);
      }));
  }

  // TODO: Use this function before init app
  public getUserForLoad(): Promise<User> {
    return this.getUser().toPromise();
  }
}
