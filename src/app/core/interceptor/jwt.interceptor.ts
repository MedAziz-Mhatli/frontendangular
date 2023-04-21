import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,HTTP_INTERCEPTORS,
  HttpInterceptor,
} from '@angular/common/http';
import { TokenStorageService } from '../service/token-storage.service';

import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private token:TokenStorageService,private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request
    const token = this.token.getToken();
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && token != null) { 
      authReq = request.clone({
          headers : request.headers.set(TOKEN_HEADER_KEY, 
            'Bearer'+token)
      
      });
    }

    return next.handle(authReq);

    
  }
}

export const authInterceptorProviders = [ 
  {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor,
  multi:true }
];
