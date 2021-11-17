import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'npx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    productId: this.fb.array([])
  })
  selectedProducts: Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private productsService: ProductsService, private fb: FormBuilder) { }

  products$ = this.productsService.getProducts();

  onChange(product: Product) {
    product.selected = !product.selected;
    const products = this.form.get('productId') as FormArray;

    if (product.selected) {
      // this is just demonstrating two different ways to handle tracking selected products, using a FormArray, and using a regular array ¯\_(ツ)_/¯
      products.push(new FormControl(product.id)); // <-- FormArray
      this.selectedProducts.push(product); // <-- Array
    } else {
      const index = products.controls.findIndex(x => x.value === product.id); // <-- FormArray
      products.removeAt(index); // <-- FormArray

      const selectedProductsIdx = this.selectedProducts.findIndex(prod => prod.id === product.id);  // <-- Array
      this.selectedProducts.splice(selectedProductsIdx, 1);  // <-- Array
    }
  }

  ngOnInit() {
    this.productsService.selectedProducts$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(products => products.filter(product => product.selected).map(product => this.selectedProducts.push(product)));
  }

  submit() {
    console.log(this.form.value.id);
  }
  toggleAddProduct(event: boolean, product: Product) {
    console.log(event);
    this.selectedProducts.push(product);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
