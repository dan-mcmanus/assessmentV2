import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';
import { ProductListComponent } from './product-list.component';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({
      array: () => [],
      group: () => ({})
    });
    const productsServiceStub = () => ({
      getProducts: () => of(mockProducts)
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ProductsService, useFactory: productsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedProducts has default value`, () => {
    expect(component.selectedProducts).toEqual([]);
  });
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
