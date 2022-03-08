describe('authentication', () => {
  describe('login', () => {
    beforeEach(() => cy.visit('/authentication/login'));
    describe('form validation', () => {
      it('should error on required inputs', () => {
        cy.get('#email input').focus().blur();
        cy.get('#password input').focus().blur();
        cy.get('#email').should('have.class', 'ng-invalid');
        cy.get('#password').should('have.class', 'ng-invalid');
      });
      it('should error on email', () => {
        cy.get('#email input').type('test').blur();
        cy.get('#email .mat-error').contains('Invalid email');
      });
      it('should show error from api', () => {
        cy.get('#email input').type('test@test.com');
        cy.get('#password input').type('test');
        const message = 'Email or password are incorrect.';
        cy.get('form').submit();
        cy.get('.api-error').contains(message);
      });
    });
  });
  describe('register', () => {
    beforeEach(() => {
      cy.visit('/authentication/register');
    });
    it('should show thank you for registering', () => {
      cy.window().its('store').invoke('dispatch', {
        type: '[Authentication/API] Register Success',
      });
      cy.get('.authentication-body h2').contains('Thanks for registering!');
    });
    describe('form validation', () => {
      it('should error on required inputs', () => {
        cy.get('#email input').focus().blur();
        cy.get('#firstName input').focus().blur();
        cy.get('#lastName input').focus().blur();
        cy.get('#password input').focus().blur();
        cy.get('#confirmPassword input').focus().blur();
        cy.get('#email').should('have.class', 'ng-invalid');
        cy.get('#firstName').should('have.class', 'ng-invalid');
        cy.get('#lastName').should('have.class', 'ng-invalid');
        cy.get('#password').should('have.class', 'ng-invalid');
        cy.get('#confirmPassword').should('have.class', 'ng-invalid');
      });
      it('should error on email', () => {
        cy.get('#email input').type('test').blur();
        cy.get('#email .mat-error').contains('Invalid email');
      });
      it('should error on confirm password', () => {
        cy.get('#password input').type('test');
        cy.get('#confirmPassword input').type('test2').blur();
        cy.get('#confirmPassword .mat-error').contains(
          'Passwords do not match'
        );
      });
    });
  });
  describe('confirm registration', () => {
    beforeEach(() => {
      cy.visit('/authentication/confirm-registration?userId=1&token=testToken');
    });
    it('should display registration complete view', () => {
      cy.window().its('store').invoke('dispatch', {
        type: '[Authentication/API] Confirm Registration Success',
      });
      cy.get('h1').contains('Registration Complete');
    });
  });
});
