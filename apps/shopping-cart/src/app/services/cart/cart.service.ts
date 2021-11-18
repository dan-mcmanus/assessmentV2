import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CalculateTaxPipe } from '../../pipes/calculate-tax.pipe';
import { TaxService } from '../tax/tax.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'api/carts';
  calculatorTaxPipe = new CalculateTaxPipe(this.taxService)
  invoiceGenerated = false;
  totalTax = 0;
  totalCost = 0;

  private totalCostSub = new BehaviorSubject<number>(0);
  private totalTaxSub = new BehaviorSubject<number>(0);
  private invoiceGeneratedSub = new Subject<boolean>();

  totalCost$ = this.totalCostSub.asObservable();
  totalTax$ = this.totalTaxSub.asObservable();
  invoiceGenerated$ = this.invoiceGeneratedSub.asObservable();

  constructor(private http: HttpClient, private taxService: TaxService) { }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}`)
    .pipe(
      tap(carts => carts.map(cart =>
        cart.products.forEach(product => {
          this.totalCostSub.next(product.unitPrice);
          this.totalTaxSub.next(this.calculatorTaxPipe.transform(product, 'computed'));
        }))),
      catchError(this.handleError)
    );
  }

  public openPDF(): void {
    this.invoiceGeneratedSub.next(true);
    setTimeout(() => {
      this.save();
    }, 100)
  }

  private save(): void {

    const DATA: unknown = document.getElementById('htmlData');

    html2canvas(DATA as never).then(canvas => {

      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save(`invoice-${new Date().getDate()}.pdf`);

    });
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


