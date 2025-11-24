describe('Главная страница с моковыми ингредиентами', () => {
  it('перехватывает запрос к api/ingredients и отдаёт мок-данные', () => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'        
    }).as('getIngredients');

    cy.visit('/');   

    cy.wait('@getIngredients').then(interception => {
      console.log('MOCK RESPONSE BODY:', interception.response?.body);
    });

    cy.contains('Флюоресцентная булка R2-D3').should('exist');
  });
});
