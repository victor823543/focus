/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Custom command to check if an element has a class (works with css-modules).
     * @example cy.get('button').hasClass('btn-primary')
     */
    hasClass(className: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Custom command to seed the database with a basic user.
     * @example cy.seedBasicUser()
     */
    seedBasicUser(): Chainable<any>;
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
    /**
     * Custom command to seed the database with a user and an empty session.
     * @example cy.seedUserWithEmptySession()
     */
    seedUserWithEmptySession(): Chainable<any>;
    /**
     * Custom command to log in using the API and create an empty session.
     * @example cy.loginWithEmptySession()
     */
    loginWithEmptySession(): Chainable<any>;
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

Cypress.Commands.add(
  "hasClass",
  { prevSubject: true },
  (subject: JQuery<HTMLElement>, className: string) => {
    const classNameAttr = subject.attr("class");
    // Use a regular expression to check if the class name is included to work with css modules
    const regex = new RegExp(`${className}`);
    expect(classNameAttr).to.match(regex);
  },
);

Cypress.Commands.add("seedBasicUser", () => {
  cy.fixture("user").then((user) => {
    cy.request("POST", "http://localhost:4000/api/users/signup", user.basicUser)
      .its("status")
      .should("eq", 200);
  });
});

Cypress.Commands.add("login", () => {
  cy.fixture("user").then((user) => {
    cy.request("POST", "http://localhost:4000/api/users/login", {
      email: user.basicUser.email,
      password: user.basicUser.password,
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

Cypress.Commands.add("seedUserWithEmptySession", () => {
  cy.fixture("dbSeedWithEmptySession").then((data: any) => {
    cy.request("POST", "http://localhost:4000/api/test/seed-db", {
      user: data.user,
      userCategories: data.categories,
      session: data.session,
    })
      .its("status")
      .should("eq", 204);
  });
});

Cypress.Commands.add("loginWithEmptySession", () => {
  cy.fixture("user").then((data: any) => {
    cy.request("POST", "http://localhost:4000/api/users/login", {
      email: data.userWithEmptySession.email,
      password: data.userWithEmptySession.password,
    }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
  });
});
