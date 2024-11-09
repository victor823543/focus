describe("Session Settings", () => {
  beforeEach(function () {
    cy.seedUserWithEmptySession();
    cy.loginWithEmptySession();
    cy.fixture("user").then((users) => {
      cy.wrap(users.userWithEmptySession).as("user");
    });
    cy.fixture("dbSeedWithEmptySession").then((data) => {
      cy.wrap(data.session).as("session");
      cy.wrap(data.categories).as("categories");
    });
    cy.visit("settings?tab=session");
  });

  it("should render the settings page with correct data", function () {
    cy.reload();
    cy.get('input[type="text"]').should("have.value", this.session.title);
    cy.dataCy("start-field")
      .find('input[type="date"]')
      .should(
        "have.value",
        new Date(this.session.start).toISOString().substring(0, 10),
      );
    this.categories.forEach((category: any) => {
      cy.dataCy("category-scroller").contains(category.name);
    });
  });

  it("should update the session title and show confirmation", () => {
    cy.get('input[type="text"]').clear().type("newTitle");
    cy.dataCy("update").click();
    cy.get('input[type="text"]').should("have.value", "newTitle");
    cy.dataCy("success-alert").should("be.visible");
    cy.reload();
    cy.get('input[type="text"]').should("have.value", "newTitle");
  });

  it("should update the session start date and show confirmation", () => {
    cy.dataCy("start-field")
      .find('input[type="date"]')
      .clear()
      .type("2024-08-01");
    cy.dataCy("update").click();
    cy.dataCy("start-field")
      .find('input[type="date"]')
      .should("have.value", "2024-08-01");
    cy.dataCy("success-alert").should("be.visible");
    cy.reload();
    cy.dataCy("start-field")
      .find('input[type="date"]')
      .should("have.value", "2024-08-01");
  });

  it("should delete the last session", () => {
    cy.dataCy("delete-session").click();
    cy.dataCy("confirm-delete").click();
    cy.url().should("include", "/configuration");
    // Should not be able to visit dashboard without a session
    cy.visit("/dashboard");
    cy.url().should("not.include", "/dashboard");
  });

  it("should delete session and change to other session when more than 1 session exists", () => {
    cy.createSession();
    cy.reload();
    cy.dataCy("delete-session").click();
    cy.dataCy("confirm-delete").click();
    cy.url().should("include", "/dashboard");
    cy.fixture("sessions").then((session) => {
      cy.dataCy("session-display").should("contain", session.title);
      cy.dataCy("session-display").click();
      cy.dataCy("session-dropdown").should("be.visible");
      cy.dataCy("selected-session").should("contain", session.title);
      cy.dataCy("session-option").should("not.exist");
    });
  });
});
