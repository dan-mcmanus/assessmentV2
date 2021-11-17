import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `api/products`

  private selectedProductsSub = new Subject<Product[]>();
  selectedProducts$ = this.selectedProductsSub.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(
      map(products => products.map(product => ({
        ...product,
        selected: false
      }))),
      tap(products => this.selectedProductsSub.next(products)),
      catchError(this.handleError)
      )
  }

  private handleError(err: any) {
    // would normally log to a remote logger
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}


