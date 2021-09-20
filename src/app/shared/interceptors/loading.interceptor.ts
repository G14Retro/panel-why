import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  //servicios a ignorar
  skipApiCall = [
    'auth/refresh',
    'config/extend/check',
    'manual/dial/call/look',
    'incomming'
  ];

  constructor(private spinner: NgxSpinnerService) {}

  /**
   * Interceptor para un spinner global
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.isValidRequestForInterceptor(request.url)){
      this.spinner.show();
      return next.handle(request).pipe(
        finalize(() => this.spinner.hide())
      );
    }else{
      return next.handle(request)
    }

  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = '/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.skipApiCall) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

}