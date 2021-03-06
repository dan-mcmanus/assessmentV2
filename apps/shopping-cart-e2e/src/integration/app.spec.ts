

import { getAllProductsListCheckBoxes, getProductsTable } from '../support/app.po';
import { validateFileHasContent } from '../support/util';

describe('shopping-cart', () => {
  beforeEach(() => cy.visit('/'));
  describe('products-list', () => {
    it('should contain all table header names', () => {
      // Custom command example, see `../support/commands.ts` file
      // cy.login('my-email@something.com', 'myPassword');

      // Function helper example, see `../support/app.po.ts` file
      // getGreeting().contains('Welcome to shopping-cart!');
      const headerNames = [
        '#basketNameTableHeader',
        '#basketItemsTableHeader',
        '#priceTableHeader',
        '#quantityTableHeader',
        '#taxTableHeader',
        '#totalAmountTableHeader'
      ];
      const expectedText = [
        'Basket Name',
        'Basket Items',
        'Price',
        'Quantity',
        'Tax',
        'Total Amount'
      ];
      for (let idx = 0; idx < headerNames.length; idx++) {
        cy.get(headerNames[idx]).should('include.text', `${expectedText[idx]}`)
      }
    });

    it('products list should contain no checked items on initial page render', () => {
      getAllProductsListCheckBoxes().should('have.value', 'false');
    })

    it('products list should add id to form array when checkbox is checked', () => {
      getAllProductsListCheckBoxes().should('have.value', 'false')
      getAllProductsListCheckBoxes().check();

      getAllProductsListCheckBoxes().should('have.value', 'true');
    })
  })

  describe('cart-component', () => {
    it('clicking View Invoice button downloads invoice', () => {
      cy.get('[data-cy=view-invoice-button').click();

      cy.get('[data-cy=totalCostRow]').should('be.visible');
      validateFileHasContent();
    })
  })
});
