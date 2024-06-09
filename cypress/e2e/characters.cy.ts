describe('Characters', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Path to find Amber and find certain information', () => {
        cy.get('a').contains('Characters').click();
        cy.wait(2000);
        cy.contains('h1', 'Characters List').should('be.visible');
        cy.wait(2000);
        cy.get('a[id="Amber"]').click();
        cy.wait(2000);
        cy.contains('h1', 'Amber').click();
        cy.wait(2000);
        cy.get('button').contains('Show Materials').click();
        cy.contains('h3', '-Star Outrider').click();
        cy.get('a').contains('Open in New Tab').click();
    });

    it('Path from Birthdays to Zhongli and find gallery', () => {
        cy.get('#months').select('December');
        cy.wait(4000);
        cy.get('a#Zhongli_month').click();
        cy.wait(2000);
        cy.url().should('include', '/characters/Zhongli');
        cy.contains('h1', 'Zhongli').click();
    });

    it('Path from daily domains to Diluc by pathing through Sunday, then to Friday', () => {
        cy.get('#days').select('Sunday');
        cy.wait(2000);
        cy.get('#days').select('Friday');
        cy.wait(2000);
        cy.get('a#Diluc_daily').click();
        cy.url().should('include', '/characters/Diluc');
        cy.contains('h1', 'Diluc').click();
    });
});