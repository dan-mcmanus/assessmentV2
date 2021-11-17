import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ProductsService } from './services/products/products.service';
import { TaxService } from './services/tax/tax.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculateTaxPipe } from './pipes/calculate-tax.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    CalculateTaxPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 0,
      passThruUnknownUrl: true
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  providers: [
    ProductsService,
    TaxService,
    { provide: InMemoryDataService, useExisting: InMemoryDbService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
