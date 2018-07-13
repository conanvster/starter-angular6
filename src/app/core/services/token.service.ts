import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  private token: string;

  public getToken(): string {
    if (this.token) {
      return this.token;
    }
    document.cookie.split('; ')
      .forEach((value) => {
        const data = value.split('=');
        if (data[0] === 'token') {
          this.token = data[1];
          return data[1];
        }
      });
  }

  public setToken(token: string): void {
    const date = new Date();
    date.setDate(date.getDate() + 365);
    document.cookie = `token=${token}; path=/; expires=${date.toUTCString()}`;
    this.token = token;
  }

}
