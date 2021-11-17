
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CurrencyPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { TaxService } from '../services/tax/tax.service';
import { CalculateTaxPipe } from './calculate-tax.pipe';

describe('CalculateTaxPipe', () => {
  let taxService: TaxService;
  let pipe: CalculateTaxPipe;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CalculateTaxPipe,
        TaxService
      ]
    });
    taxService = TestBed.inject(TaxService);
    pipe = new CalculateTaxPipe(taxService);
  });

  it('creates an instance', () => {
    // aaa
    expect(pipe).toBeTruthy();
  });

  it('given not imported and not tax exempt, when CalculatTaxPipe applied, adds 10% sales tax to products unit price', () => {
    // arrange
    const currencyPipe = new CurrencyPipe('en-US', 'USD');
    const taxType = 'total';
    const selectedProduct = mockProducts[1];
    const expectedResult = 109.99; // 10% sales tax
    const expectedResultAsCurrency = "$109.99"; // 10% sales tax

    // act
    const result = pipe.transform(selectedProduct, taxType, 1);

    // assert
    expect(result).toBe(expectedResult);
    expect(currencyPipe.transform(selectedProduct.unitPrice * 0.1 + selectedProduct.unitPrice)).toEqual(expectedResultAsCurrency)
  })
});



const mockProducts: Product[] =
[
  {
    "id": 1,
    "name": "16lb bag of Skittles",
    "category": {
      "name": "Candy",
      "taxExempt": true
    },
    "unitPrice": 16.00,
    "imported": false,
    "taxExempt": true
  },
  {
    "id": 2,
    "name": "Walkman",
    "category": {
      "name": "Electronics",
      "taxExempt": false
    },
    "unitPrice": 99.99,
    "imported": false,
    "taxExempt": false
  },
  {
    "id": 3,
    "name": "bag of microwave Popcorn",
    "category": {
      "name": "Popcorn",
      "taxExempt": true
    },
    "unitPrice": 0.99,
    "imported": false,
    "taxExempt": true
  },
  {
    "id": 4,
    "name": "bag of Vanilla-Hazelnut Coffee",
    "category": {
      "name": "Coffee",
      "taxExempt": true
    },
    "unitPrice": 11.00,
    "imported": true,
    "taxExempt": false

  },
  {
    "id": 5,
    "name": "Vespa",
    "category": {
      "name": "Transportation",
      "taxExempt": false
    },
    "unitPrice": 15001.25,
    "imported": true,
    "taxExempt": false
  },
  {
    "id": 6,
    "name": "crate of Almond Snickers",
    "category": {
      "name": "Candy",
      "taxExempt": true
    },
    "unitPrice": 75.99,
    "imported": true,
    "taxExempt": false

  },
  {
    "id": 7,
    "name": "Bottle of Wine",
    "category": {
      "name": "Wine",
      "taxExempt": true
    },
    "unitPrice": 10.00,
    "imported": true,
    "taxExempt": false
  },
  {
    "id": 8,
    "name": "300# bag of Fair-Trade Coffee",
    "category": {
      "name": "Coffee",
      "taxExempt": true
    },
    "unitPrice": 997.99,
    "imported": false,
    "taxExempt": true
  }
];
