import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {

    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401: {
          router.navigate(['sign-in']);
        }
      }
    }
  }
}
