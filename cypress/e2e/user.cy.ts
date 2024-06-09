describe('Users Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Path to an incorrect user and expect an error page', () => {
    cy.get('a#Users').click();

    cy.get('input[placeholder="Enter UID..."]').click().type('5234321');

    cy.get('button').contains('Search').click();

    cy.wait(10000);
    cy.get('h1').contains('404').should('be.visible');
  });
  
  it('Path to a correct user and expect an a specific user', () => {
    cy.get('a#Users').click();

    cy.get('input[placeholder="Enter UID..."]').click().type('600020272');

    cy.get('button').contains('Search').click();

    cy.wait(10000);
    cy.get('h1').contains('Phight').should('be.visible');
  });
});