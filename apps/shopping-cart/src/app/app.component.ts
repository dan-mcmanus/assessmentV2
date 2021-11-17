import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { ProductsService } from './services/products/products.service';

@Component({
  selector: 'npx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shopping-cart';


  constructor(private productService: ProductsService) {
    setTheme('bs3');
  }

}
