import { ConfirmRegistrationRequestModel } from 'apps/sadarr/src/app/authentication/models/confirm-registration.model';
import { LoginResponseModel } from 'apps/sadarr/src/app/authentication/models/login.model';
import { environment } from 'apps/sadarr/src/environments/environment.e2e';

describe('authentication', () => {
  describe('login', () => {
    beforeEach(() => cy.visit('/authentication/login'));

    it('should set cookie and localstorage', () => {
      const email = 'test@test.com';
      const authenticationResponseModel: LoginResponseModel = {
        email,
        firstName: 'test',
        lastName: 'test',
        id: 'guid',
        token: 'testToken',
        userRoles: [],
      };

      cy.get('#email input').type('test@test.com');
      cy.get('#password input').type('test');
      cy.intercept(
        'POST',
        `${environment.prsApiUrl}/authentication/login`,
        authenticationResponseModel
      );
      cy.get('form')
        .submit()
        .should(() => {
          expect(localStorage.getItem('currentUser')).to.not.be.null;
        });
      cy.getCookie('Bearer')
        .its('value')
        .should('equal', authenticationResponseModel.token);
    });

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

        const message = 'Username or password is incorrect.';
        cy.intercept(
          'POST',
          `${environment.prsApiUrl}/authentication/login`,
          (req) => {
            req.reply({
              statusCode: 400,
              body: {
                message,
              },
            });
          }
        );

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
      cy.intercept('POST', `${environment.prsApiUrl}/authentication/register`, {
        message: 'User registered',
      });

      cy.get('#email input').type('test@test.com');
      cy.get('#firstName input').type('FirstName');
      cy.get('#lastName input').type('LastName');
      cy.get('#password input').type('test');
      cy.get('#confirmPassword input').type('test');

      cy.get('form').submit();

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

      it('should show error from api', () => {
        cy.get('#email input').type('test@test.com');

        const message = 'Email test@test.com is already taken.';
        cy.intercept(
          'POST',
          `${environment.prsApiUrl}/authentication/register`,
          (req) => {
            req.reply({
              statusCode: 400,
              body: {
                message,
              },
            });
          }
        );

        cy.get('form').submit();

        cy.get('.api-error').contains(message);
      });
    });
  });

  describe('confirm registration', () => {
    const confirmRegistration: ConfirmRegistrationRequestModel = {
      token: 'testToken',
      userId: 1,
    };

    beforeEach(() => {
      cy.visit('/authentication/confirm-registration?userId=1&token=testToken');
    });

    it('should send confirm registration request with data from url', () => {
      cy.intercept(
        'POST',
        `${environment.prsApiUrl}/authentication/confirmregistration`,
        {
          message: 'Confirmed user registration',
        }
      ).as('confirmRequest');

      cy.get('button').click();
      cy.wait('@confirmRequest').then((interception) => {
        expect(interception.request.body).to.eql(confirmRegistration);
      });
    });

    it('should display registration complete view', () => {
      cy.intercept(
        'POST',
        `${environment.prsApiUrl}/authentication/confirmregistration`,
        {
          message: 'Confirmed user registration',
        }
      ).as('confirmRequest');

      cy.get('button').click();
      cy.get('h1').contains('Registration Complete');
    });

    it('should show error from api', () => {
      cy.get('button').click();

      const message = 'Email registration token no longer valid.';
      cy.intercept(
        'POST',
        `${environment.prsApiUrl}/authentication/confirmregistration`,
        (req) => {
          req.reply({
            statusCode: 400,
            body: {
              message,
            },
          });
        }
      );

      cy.get('.api-error').contains(message);
    });
  });
});
