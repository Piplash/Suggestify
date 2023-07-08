import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 404){
          this.route.navigateByUrl('recomendaciones-musicales/inicio');
        }
        return throwError(() => error);
      })
    )
  }
}
