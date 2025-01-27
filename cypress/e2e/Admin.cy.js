describe('Logowanie', () => {
  it('Loguje administratora poprawnie', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
  });

  it('Odświeżanie', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.contains('Odśwież').should('be.visible').click();
  });

  it('Sprawdzenie tabeli', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.contains('Działania').should('be.visible');
  });

  it('Edycja wartosci w tabeli', () => {
    cy.visit('http://localhost:5173');


    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('a');

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login');
    cy.contains('Działania').should('be.visible');
    cy.contains('Edytuj').should('be.visible').click();
    cy.get('input[placeholder="nazwa"]')
      .clear()
      .type('Nowa Nuka-Cola');

    cy.contains('Zapisz')
      .should('be.visible')
      .click();
  });
  it('Usunięcie produktu', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('a'); 

    cy.contains('Zaloguj się').click();

    cy.url().should('not.include', '/login'); 
    cy.contains('Usuń').should('be.visible').click();
  });
  it('Dodanie produktu', () => {
    cy.visit('http://localhost:5173');


    cy.get('input[placeholder="Nazwa użytkownika"]').type('admin'); 
    cy.get('input[placeholder="Hasło"]').type('a'); 

    cy.contains('Zaloguj się').click();


    cy.url().should('not.include', '/login');
    cy.get('input[placeholder="Nazwa"]') 
      .clear()
      .type('Nowa Nuka-Cola');
    cy.get('input[placeholder="Cena"]')
      .clear()
      .type(100);

    cy.get('input[placeholder="Ilość"]')
      .clear() 
      .type(1000);

    cy.get('button').contains('Dodaj')
      .should('be.visible') 
      .click();
  });
});



