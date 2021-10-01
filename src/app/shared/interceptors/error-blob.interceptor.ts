import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BlobErrorHttpInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === "application/json") {
                    return new Promise<any>((resolve, reject) => {
                        let reader = new FileReader();
                        reader.onload = (e: Event) => {
                            try {
                                const errmsg = JSON.parse((<any>e.target).result);
                                reject(new HttpErrorResponse({
                                    error: errmsg,
                                    headers: err.headers,
                                    status: err.status,
                                    statusText: err.statusText,
                                    url: err.url
                                }));
                            } catch (e) {
                                reject(err);
                            }
                        };
                        reader.onerror = (e) => {
                            reject(err);
                        };
                        reader.readAsText(err.error);
                    });
                }
                return throwError(err);
            })
        );
    }
}