describe("Configuration Functionality", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("configuration");
  });

  it("should render the configuration page with disabled next button", () => {
    cy.dataCy("configuration-title").should(
      "contain",
      "Let's create your first session",
    );
    cy.dataCy("next-button").should("be.disabled");
  });

  it("should enable the next button after entering a title", () => {
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
});
