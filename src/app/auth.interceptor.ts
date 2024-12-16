import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return next.handle(newRequest);
  }
}
