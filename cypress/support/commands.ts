/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Custom command to log in using the API.
     * @example cy.login()
     */
    login(): Chainable<any>;
  }
}

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("login", () => {
  cy.fixture("user").then((user) => {
    cy.request("POST", "http://localhost:4000/api/users/login", {
      email: user.email,
      password: user.password,
    }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
  });
});
