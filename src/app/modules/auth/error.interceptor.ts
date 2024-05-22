import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private oAuthService: OAuthService, private location: Location, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.oAuthService.logOut();
                }
                return throwError(error);
            })
        );
    }
}
