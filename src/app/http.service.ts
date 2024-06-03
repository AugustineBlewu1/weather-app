import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiUrl;
  private defaultHeaders = new HttpHeaders({
    'x-rapidapi-key': environment.xRapidapiKey,
    'x-rapidapi-host': environment.xRapidapiHost,
  });

  //HTTP service injected
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(`An error occured, ${error}`));
  }

  //setup request and pipe result

  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
