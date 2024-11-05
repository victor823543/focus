describe("Configuration Functionality", () => {
  beforeEach(() => {
    cy.seedBasicUser();
    cy.login();
    cy.visit("configuration");
  });

  it("should enable the next button after entering data", () => {
    cy.dataCy("configuration-title").should(
      "contain",
      "Let's create your first session",
    );
    cy.dataCy("next-button").should("be.disabled");

    cy.dataCy("title").type("Test Session");
    cy.dataCy("next-button").should("not.be.disabled");

    cy.dataCy("next-button").click();
    cy.dataCy("categories-title").should(
      "contain",
      "Now choose your categories",
    );
    cy.dataCy("next-button").should("be.disabled");
    cy.fixture("categories").then((categories) => {
      categories.forEach((category: any) => {
        cy.dataCy(`category-${category.name}`).should("contain", category.name);
      });
    });
    cy.fixture("categories").then((categories) => {
      cy.dataCy(`category-${categories[0].name}`).click();
    });
    cy.dataCy("next-button").should("not.be.disabled");
  });

  it("should navigate back and forth between steps", () => {
    cy.dataCy("title").type("Test Session");
    cy.dataCy("next-button").click();
    cy.fixture("categories").then((categories) => {
      cy.dataCy(`category-${categories[0].name}`).click();
    });
    cy.dataCy("next-button").click();
    cy.dataCy("back-button").click();
    cy.fixture("categories").then((categories) => {
      cy.dataCy(`category-${categories[0].name}`).hasClass("selected");
    });
    cy.dataCy("back-button").click();
    cy.dataCy("configuration-title").should(
      "contain",
      "Let's create your first session",
    );
    cy.dataCy("title").should("have.value", "Test Session");
  });

  it("should create a session with correct content", () => {
    cy.dataCy("title").type("Test Session");
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
    cy.url().should("include", "/dashboard");
    cy.dataCy("session-display").should("contain", "Test Session");
    cy.dataCy("sidebar-link")
      .contains(/categories/i)
      .closest('[data-cy="sidebar-link"]')
      .click();
    cy.fixture("categories").then((categories) => {
      cy.contains(categories[0].name).should("be.visible");
    });
  });
});
