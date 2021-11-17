import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'npx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  carts$!: Observable<Cart[]>;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.carts$ = this.cartService.getAllCarts();
  }

}
