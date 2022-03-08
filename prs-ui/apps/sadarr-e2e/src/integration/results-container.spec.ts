describe('results container', () => {
  let data: { radarr: any[]; sonarr: any[] };
  beforeEach(() => {
    cy.visit('/');
    cy.authenticate();

    cy.readFile('src/fixtures/results-container-data.json').then((str) => {
      data = str;
    });
  });

  describe('radarr', () => {
    it('scroll to top when user searches again', () => {
      cy.visit('/radarr');
      cy.intercept('**/api/v3/movie/**', data.radarr);

      cy.get('.radarr-search').type('batman');

      cy.get('.radarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
        0,
        200
      );
      cy.get('.radarr-results-container .cdk-virtual-scroll-viewport')
        .invoke('prop', 'scrollTop')
        .should('equal', 200);

      cy.get('.radarr-search').type('{selectall}jackass');
      cy.get('.radarr-results-container .cdk-virtual-scroll-viewport')
        .invoke('prop', 'scrollTop')
        .should('equal', 0);
    });

    it('shows success snackbar', () => {
      cy.visit('/radarr');
      cy.window().its('store').invoke('dispatch', {
        type: '[Radarr/API] Add Movie Success',
      });
      cy.get('.snackbar-success').should('exist');
      // TODO - Check color
    });

    it('shows failure snackbar', () => {
      cy.visit('/radarr');
      cy.window().its('store').invoke('dispatch', {
        type: '[Radarr/API] Add Movie Failure',
      });
      cy.get('.snackbar-failure').should('exist');
    });
  });

  describe('sonarr', () => {
    it('scroll to top when user searches again', () => {
      cy.visit('/sonarr');
      cy.intercept('**/api/v3/series/**', data.sonarr);

      cy.get('.sonarr-search').type('the blacklist');

      cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
        0,
        200
      );
      cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport')
        .invoke('prop', 'scrollTop')
        .should('equal', 200);

      cy.get('.sonarr-search').type('{selectall}batman');
      cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport')
        .invoke('prop', 'scrollTop')
        .should('equal', 0);
    });
  });
});
