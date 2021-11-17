import { Injectable } from '@angular/core';

import { RequestInfo, InMemoryDbService } from 'angular-in-memory-web-api';
import { Cart } from '../models/cart';
import { Product } from '../models/product';


/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  /** Create the in-memory database. Sample data is found below. */
  createDb(reqInfo?: RequestInfo) {
    return { carts, products };
  }

  /**
   * Simulate generating new Id on the server
   * All collections in this db have numeric ids.
   * Seed grows by highest id seen in any of the collections.
   */
  genId(collection: { id: number }[], collectionName: string) {
    this.maxId =
      1 +
      collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
    return this.maxId;
  }

}

const products: Product[] =
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

const carts: Cart[] = [
  {
    "id": 1,
    "name": "Basket 1",
    "products": [
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
      }
    ]
  },
  {
    "id": 2,
    "name": "Basket 2",
    "products": [
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
      }
    ]
  },
  {
    "id": 3,
    "name": "Basket 3",
    "products": [
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
    ]
  }
];



