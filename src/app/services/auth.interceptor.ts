import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


const TOKEN_HEADER = 'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginServe:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq=request;
    const token = this.loginServe.getToken();
    if (token != null && token != '') {
      authReq=authReq.clone({
        setHeaders: { Authorization:`Bearer ${token}`},
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorsProviders = [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,
  },
];
