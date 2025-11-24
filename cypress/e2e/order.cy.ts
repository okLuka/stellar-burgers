describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=test-access-token';
      }
    });

    cy.wait('@getIngredients');
  });

  it('успешно создаёт заказ и очищает конструктор', () => {
    cy.contains('Флюоресцентная булка R2-D3')      
      .parents()                                    
      .first()
      .find('button')                               
      .click();                                     

    cy.contains('Филе Люминесцентного тетраодонтиформуса')
      .parents()
      .first()
      .find('button')
      .click();                                     

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder').then((i) => {
      const num = i.response?.body?.order?.number;

      // ПРОВЕРКА МОДАЛКИ
      cy.get('#modals').contains(num).should('exist');

      cy.get('#modals').find('button').first().click();

      cy.get('#modals').contains(num).should('not.exist');
    });

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
