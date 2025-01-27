describe('Logowanie', () => {
  it('Loguje użytkownika poprawnie', () => {
    
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('user');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Zalogowano jako user');
    });
  });
  it('Odświeżanie', () => {
    
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('user');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.contains('Odśwież').should('be.visible').click();
  });

  it('Sprawdzenie tabeli', () => {
    
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('user');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.contains('Zdjęcie').should('be.visible');
    cy.contains('Działania').should('not.be.visible');
  });
});