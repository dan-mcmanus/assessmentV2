import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxService);
  });

  it('should be created', () => {
    // aaa
    expect(service).toBeTruthy();
  });

  it('tax amount should be a multiple of $0.05', () => {
    const product = mockProducts[0];
  });

  it('computSalesTax will return 0 if Product.Category.taxExempt is true', () => {
    // arrange
    const product = mockProducts[0];

    // act
    const result = service.computeSalesTax(product, 1);

    // assert
    expect(result).toEqual(0);
  })

  it('tax percentage should be 10 if product is not tax exempt and is not imported', () => {
    // arrange
    const product = mockProducts[1];

    // act
    const result = service.computeSalesTax(product, 1);

    // assert
    expect(result).toEqual(10);
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
