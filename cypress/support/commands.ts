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
    /**
     * Custom command to log in using the API and create a session.
     * @example cy.loginWithSession()
     */
    loginWithSession(): Chainable<any>;
  }
}

//Helper functions
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const resetToMidnight = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

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

Cypress.Commands.add("loginWithSession", () => {
  cy.fixture("sessions").then((session) => {
    cy.request("POST", "http://localhost:4000/api/users/login", {
      email: session.user.email,
      password: session.user.password,
    })
      .then((resp) => {
        window.localStorage.setItem("token", resp.body.token);
      })
      .then((resp) => {
        cy.request({
          method: "POST",
          url: "http://localhost:4000/api/sessions/configure",
          auth: { bearer: resp.body.token },
          body: {
            categories: session.categories,
            title: session.title,
            start: addDays(resetToMidnight(new Date()), -2).toISOString(),
          },
        });
      });
  });
});
