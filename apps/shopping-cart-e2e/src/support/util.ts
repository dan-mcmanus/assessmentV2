/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')



export const validateFileHasContent = () => {
  const downloadsFolder = Cypress.config('downloadsFolder')
  const downloadedFilename = path.join(downloadsFolder, `invoice-${new Date().getDate()}.pdf`)

  cy.readFile(downloadedFilename).should((text) => {
    const lines = text.split('\n')

    expect(lines.length).to.be.greaterThan(1);
  })
}
