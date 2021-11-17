import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  salesTax = 0.1;
  importTax = 0.05;
  private readonly roundToNearest = 0.05;

  computeSalesTax(product: Product, quantity: number = 1): number {
    if (product.category.taxExempt || product.taxExempt) {
      this.salesTax = 0;
      return this.salesTax;
    }

    return this.roundUp(product.unitPrice * quantity * this.salesTax, this.roundToNearest);
  }

  computeDutyTax(product: Product, quantity: number = 1): number {
    return !product.imported ? 0.00 : this.roundUp(product.unitPrice * quantity * this.importTax, this.roundToNearest);
  }

  /*
   * Sales tax is rounded up to the nearest multiple of $0.05.
   * This rounding is done by item, by type of tax (basic sales tax and import duty tax)
   */
  private roundUp(value: number, nearest: number): number {
    const remainder = value % nearest;
    if (remainder === 0) {
      return value;
    }

    const result = Math.ceil(value / nearest) * nearest;
    return result;
  }

}
