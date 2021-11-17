import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { TaxType } from '../models/types/tax.type';
import { TaxService } from '../services/tax/tax.service';


@Pipe({
  name: 'calculateTax'
})
export class CalculateTaxPipe implements PipeTransform {

  constructor(private taxService: TaxService) {}

  transform(product: Product, taxType: TaxType, quantity: number = 1): number {
    const salesTax = this.taxService.computeSalesTax(product, quantity);
    const dutyTax = this.taxService.computeDutyTax(product, quantity);
    const computedTax = dutyTax + salesTax;
    const totalWithoutTax = product.unitPrice * quantity;
    const total = computedTax + totalWithoutTax;

    switch (taxType) {
      case 'computed':
        return computedTax;
      case 'totalwithouttax':
        return totalWithoutTax;
      case 'total':
        return total;
      default:
        return 0;
    }
  }

}
