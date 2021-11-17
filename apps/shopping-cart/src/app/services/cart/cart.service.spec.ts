import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Cart } from '../../models/cart';
import { ProductsService } from '../products/products.service';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CartService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllCarts calls GET api/baskets', () => {
    httpClient.get<Cart[]>('api/carts')
      .subscribe(data => expect(data).toEqual(mockCarts));

        const req = httpTestingController.expectOne('api/carts');
-
        expect(req.request.method).toEqual('GET');
-
        req.flush(mockCarts);

        httpTestingController.verify();

  });
});

const mockCarts: Cart[] = [
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
