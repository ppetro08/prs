// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    authenticate(): void;
  }
}

Cypress.Commands.add('authenticate', () => {
  cy.window()
    .its('store')
    .invoke('dispatch', {
      type: '[Authentication/API] Login Success',
      user: {
        id: '1',
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com',
        emailConfirmed: true,
        token: 'token',
        userRoles: [
          {
            userId: '1',
            roleId: '1',
            role: {
              id: '1',
              name: 'Movie_Add',
            },
          },
          {
            userId: '1',
            roleId: '2',
            role: {
              id: '2',
              name: 'Movie_Request',
            },
          },
        ],
      },
    });
});
