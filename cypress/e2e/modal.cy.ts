describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('открывает модалку по клику на ингредиент', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.get('#modals').within(() => {
      cy.contains('Флюоресцентная булка R2-D3').should('exist');
    });
  });

  it('закрывает модалку по клику на крестик', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.get('#modals')
      .find('button')
      .first()
      .click(); 

    cy.get('#modals')
      .contains('Флюоресцентная булка R2-D3')
      .should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get('#modals')
      .children()
      .last()
      .click('topLeft', { force: true });

    cy.get('#modals')
      .contains('Флюоресцентная булка R2-D3')
      .should('not.exist');
  });
});
