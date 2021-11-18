
export const getAllProductsListCheckBoxes = () => cy.get('#productsListTable').children().get('input[type="checkbox"');
export const getProductsTable = () => cy.get('#productsListTable');

