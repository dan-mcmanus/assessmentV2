import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'npx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy {
  invoiceGenerated = false;
  carts$!: Observable<Cart[]>;
  destroy$ = new Subject<boolean>();
  totalTax = 0;
  totalCost = 0;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.carts$ = this.cartService.getAllCarts();

    this.cartService.totalCost$
      .pipe(takeUntil(this.destroy$))
      .subscribe(amt => this.totalCost += amt);

    this.cartService.totalTax$
      .pipe(takeUntil(this.destroy$))
      .subscribe(amt => this.totalTax += amt);

    this.cartService.invoiceGenerated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.invoiceGenerated = result);
  }

  ngOnDestroy() {
    this.destroy$?.next(true);
    this.destroy$?.unsubscribe();
  }

}
