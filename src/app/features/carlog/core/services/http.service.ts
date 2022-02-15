import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { delay, catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class HttpService extends HttpClient {
  delayMs = 0;

  constructor(private loaderService: LoadingService,
              private backend: HttpXhrBackend) {
    super(backend);
  }

  get<T>(url: string): Observable<T> {
    this.showLoader();
    return super.get<T>(url)
    .pipe(
      delay(this.delayMs),
      catchError(this.onCatch),
      finalize(() => {
        this.onEnd()
      }),
      tap((res) => this.onSuccess(res))
    )

      // .do((res: Response) => {
      //   this.onSuccess(res);
      // }, (error: any) => {
      //   this.onError(error);
      // })

  }

  put<T>(url: string, model: T): Observable<T> {
    this.showLoader();

    return super.put<T>(url, model)
    .pipe(
    //  delay(delayMs),
      catchError(this.onCatch),
      finalize(() => {
        this.onEnd()
      }),
      tap((res) => this.onSuccess(res))
    )
  }

  post<T>(url: string, model: T): Observable<T> {
    this.showLoader();
    return super.post<T>(url, model)
    .pipe(
      //delay(this.delayms),
      catchError(this.onCatch),
      finalize(() => {
        this.onEnd()
      }),
      tap((res) => this.onSuccess(res))
    )
  }

  delete(url: string): Observable<any> {
    this.showLoader();
    return super.delete(url)
    .pipe(
      //delay(this.delayms),
      catchError(this.onCatch),
      finalize(() => {
        this.onEnd()
      }),
      tap((res) => this.onSuccess(res))
    )
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onSuccess(res: Response): void {
    // console.log('Successful call');
  }

  private onError(res: Response): void {
    console.log('Error: ' + res.status);
  }

  private onEnd() {
    this.hideLoader();
    //this.delayms = 0;
  }

  private showLoader(title?: string, message?: string): void {
    this.loaderService.show(title, message);
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

}
