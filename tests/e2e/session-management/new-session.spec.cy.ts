describe("New Session Functionality", () => {
  beforeEach(function () {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.fixture("dbSeedWithEmptySession").then((data) => {
      cy.wrap(data.session).as("firstSession");
      cy.wrap(data.categories).as("categories");
    });
    cy.fixture("sessions").then((session) => {
      cy.wrap(session).as("secondSession");
    });
    cy.createSession();
    cy.visit("dashboard");
  });

  it("should switch session", function () {
    cy.dataCy("session-display").should("contain", this.firstSession.title);
    cy.dataCy("session-display").click();
    cy.dataCy("selected-session").should("contain", this.firstSession.title);
    cy.dataCy("session-option").should("contain", this.secondSession.title);
    cy.dataCy("session-option").click();
    cy.dataCy("session-display").should("contain", this.secondSession.title);
  });

  it("should create a new session", function () {
    cy.dataCy("session-display").click();
    cy.dataCy("add-session").click();
    cy.url().should("include", "/configuration");

    // Creates a new session in configuration page
    cy.dataCy("title").type("Third Session");
    cy.dataCy("next-button").click();
    cy.fixture("categories").then((categories) => {
      cy.dataCy(`category-${categories[0].name}`).click();
    });
    cy.dataCy("next-button").click();
    cy.dataCy("next-button").click();
    cy.dataCy("start-container")
      .find("[data-cy=calendar-day-1]")
      .first()
      .click();
    cy.dataCy("create-button").click();

    // Check if the new session is created and the other session is still there
    cy.url().should("include", "/dashboard");
    cy.dataCy("session-display").should("contain", "Third Session");
    cy.dataCy("session-display").click();
    cy.dataCy("selected-session").should("contain", "Third Session");
    cy.dataCy("session-option").should("have.length", 2);
  });
});
