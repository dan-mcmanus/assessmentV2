import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';
import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TaxService] });
    service = TestBed.inject(TaxService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`salesTax has default value`, () => {
    expect(service.salesTax).toEqual(0.1);
  });

  it(`importTax has default value`, () => {
    expect(service.importTax).toEqual(0.05);
  });
});
