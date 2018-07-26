import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../services/token.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (this.tokenService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.tokenService.getToken()}`;
    }
    const request = req.clone({
      url: `${environment.api_url}${req.url}`,
      setHeaders: headersConfig
    });
    return next.handle(request);
  }

  // private hadleAuthError()
}
